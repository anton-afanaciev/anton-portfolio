import { test, expect } from '@playwright/test'

test('portrait labels stay clear of the photo in both themes at supported widths', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const width of [320, 360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const theme of ['dark', 'light']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) {
        await page.getByRole('button', { name: theme === 'light' ? 'Включить светлую тему' : 'Включить тёмную тему' }).click()
      }
      const home = page.locator('#home')
      await expect(home.getByText('ANTON / PERSONAL SPACE')).toHaveCount(0)
      await expect(home.getByText('01 — 06', { exact: true })).toHaveCount(0)
      const image = (await home.locator('img').boundingBox())!
      for (const text of ['QA ENGINEER / AI EXPLORER', 'QA × AI × CURIOSITY', 'ВНИМАНИЕ К ДЕТАЛЯМ']) {
        // The decorative curiosity caption also appears below the entire hero.
        const label = home.getByText(text, { exact: true }).first()
        await expect(label).toBeVisible()
        const box = (await label.boundingBox())!
        const overlap = box.x < image.x + image.width && box.x + box.width > image.x && box.y < image.y + image.height && box.y + box.height > image.y
        expect(overlap, `${text}, ${width}px, ${theme}`).toBe(false)
        expect(box.x).toBeGreaterThanOrEqual(0)
        expect(box.x + box.width).toBeLessThanOrEqual(width)
      }
      const contacts = page.locator('#contacts a')
      await expect(contacts).toHaveCount(3)
      for (const link of await contacts.all()) {
        const box = (await link.boundingBox())!
        expect(box.width).toBeGreaterThanOrEqual(44)
        expect(box.height).toBeGreaterThanOrEqual(44)
        const address = (await link.locator('div > span').boundingBox())!
        expect(address.x).toBeGreaterThanOrEqual(box.x)
        expect(address.x + address.width).toBeLessThanOrEqual(box.x + box.width)
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
  }
})

test('real contact cards activate by click, keyboard and mobile touch', async ({ page, context, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  // Keep the regression deterministic: exercise navigation without depending on external services.
  await context.route('https://t.me/Anton_afff', route => route.fulfill({ contentType: 'text/html', body: '<title>Telegram destination</title>' }))
  await page.goto('/#contacts')
  const section = page.locator('#contacts')
  await expect(section.getByRole('link')).toHaveCount(3)
  await expect(section).not.toContainText(/Контакт пока не добавлен|появятся здесь позже/)
  const telegram = section.getByRole('link', { name: 'Telegram @Anton_afff' })
  const email = section.getByRole('link', { name: 'Email afanaciev.anton@yandex.ru' })
  const github = section.getByRole('link', { name: 'GitHub anton-afanaciev' })
  await expect(telegram).toHaveAttribute('href', 'https://t.me/Anton_afff')
  await expect(telegram).toHaveAttribute('target', '_blank')
  await expect(telegram).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(email).toHaveAttribute('href', 'mailto:afanaciev.anton@yandex.ru')
  for (const link of [telegram, github, email]) await expect(link.locator('svg[aria-hidden="true"]')).toHaveCount(1)

  await context.route('https://github.com/anton-afanaciev', route => route.fulfill({ contentType: 'text/html', body: '<title>GitHub destination</title>' }))
  await expect(github).toHaveAttribute('href', 'https://github.com/anton-afanaciev')
  await expect(github).toHaveAttribute('target', '_blank')
  await expect(github).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(email).not.toHaveAttribute('target', '_blank')

  for (const externalLink of [telegram, github]) {
    for (const keyboard of [false, true]) {
      if (keyboard) {
        await externalLink.focus()
        await page.keyboard.press('Shift+Tab')
        await page.keyboard.press('Tab')
        await expect(externalLink).toBeFocused()
        await expect(externalLink).toHaveCSS('outline-style', 'solid')
      }
      const popupPromise = page.waitForEvent('popup')
      if (keyboard) {
        await page.keyboard.press('Enter')
      } else if (isMobile) await externalLink.tap()
      else await externalLink.click()
      const popup = await popupPromise
      await expect(popup).toHaveURL((await externalLink.getAttribute('href'))!)
      await popup.close()
    }
  }

  // Observe activation without opening a mail client or sending a message in the test runner.
  await email.evaluate(el => el.addEventListener('click', event => {
    event.preventDefault()
    el.setAttribute('data-activated-url', (el as HTMLAnchorElement).href)
    el.setAttribute('data-trusted', String(event.isTrusted))
  }))
  if (isMobile) await email.tap()
  else await email.click()
  await expect(email).toHaveAttribute('data-activated-url', 'mailto:afanaciev.anton@yandex.ru')
  await expect(email).toHaveAttribute('data-trusted', 'true')
  await email.evaluate(el => el.removeAttribute('data-activated-url'))
  await email.focus()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  await expect(email).toBeFocused()
  await expect(email).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(email).toHaveAttribute('data-activated-url', 'mailto:afanaciev.anton@yandex.ru')
  await expect(page).toHaveURL(/#contacts$/)
})
