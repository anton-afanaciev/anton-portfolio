import { test, expect } from '@playwright/test'

test('name leads hero, portrait follows on mobile, and photo cards respect reduced motion', async ({ page }) => {
  await page.goto('/')
  const heading = page.getByRole('heading', { level: 1, name: 'Антон Афанасьев' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(heading).toBeVisible()
  const slogan = page.locator('#home p').filter({ hasText: 'За деталями — качество.' })
  await expect(slogan).toContainText('За идеями — новые возможности.')
  const nameSize = await heading.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
  expect(nameSize).toBeGreaterThan(await slogan.evaluate(el => parseFloat(getComputedStyle(el).fontSize)))
  const intro = page.getByText('Мой фокус — тестирование и качество продуктов.', { exact: false })
  expect((await intro.boundingBox())!.y).toBeGreaterThan((await slogan.boundingBox())!.y)
  const heroText = await heading.boundingBox()
  const photo = await page.locator('#home img').boundingBox()
  if (page.viewportSize()!.width <= 700) expect(photo!.y).toBeGreaterThan((await intro.boundingBox())!.y)
  else expect(photo!.x).toBeGreaterThan(heroText!.x + heroText!.width)

  const card = page.locator('#hobbies article').first()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await card.hover()
  await expect(card).toHaveCSS('transform', 'none')
  await expect(card.locator('img')).toHaveCSS('transform', 'none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('checkbox', { name: 'Уменьшить анимации' }).check()
  await card.hover()
  await expect(card).toHaveCSS('transform', 'none')
  await expect(card.locator('img')).toHaveCSS('transform', 'none')
})

test('all tools expand by keyboard and remain readable in both themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#skills')
  for (const theme of ['dark', 'light']) {
    if (await page.locator('html').getAttribute('data-theme') !== theme) {
      await page.getByRole('button', { name: theme === 'light' ? 'Включить светлую тему' : 'Включить тёмную тему' }).click()
    }
    const buttons = page.locator('#skills button')
    await expect(buttons).toHaveCount(28)
    for (const button of await buttons.all()) {
      await button.focus()
      await page.keyboard.press('Enter')
      await expect(button).toHaveAttribute('aria-expanded', 'true')
      const panel = page.locator('[id="' + await button.getAttribute('aria-controls') + '"]')
      await expect(panel).toBeVisible()
      const box = await button.boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    for (const button of await buttons.all()) {
      await button.focus()
      await page.keyboard.press('Space')
      await expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  }
})

test('project filters include empty states and recover without navigation', async ({ page }) => {
  await page.goto('/#projects')
  const section = page.locator('#projects')
  await expect(section.getByRole('article')).toHaveCount(1)
  await expect(section.getByText('В разработке')).toBeVisible()
  for (const category of ['AI', 'QA']) {
    await section.getByRole('button', { name: category, exact: true }).click()
    await expect(section.getByRole('article')).toHaveCount(0)
    await expect(section.getByRole('status')).toContainText('В этой категории пока нет проектов')
    await expect(section.getByRole('button', { name: category, exact: true })).toHaveAttribute('aria-pressed', 'true')
  }
  await section.getByRole('button', { name: 'Web', exact: true }).click()
  await expect(section.getByRole('heading', { name: 'Персональное портфолио' })).toBeVisible()
  await section.getByRole('button', { name: 'Все', exact: true }).click()
  await expect(section.getByRole('status')).toHaveText('Проектов: 1')
  await expect(page).toHaveURL(/#projects$/)
})

test('local photos load and external images are credited honestly', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#home').getByText('QA Engineer', { exact: true })).toBeVisible()
  await expect(page.locator('#home img')).toHaveAttribute('loading', 'eager')
  await expect(page.locator('#home img')).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('#home img')).toHaveAttribute('alt', 'Антон Афанасьев в чёрной футболке')
  await expect(page.locator('#hobbies article')).toHaveCount(3)
  await expect(page.locator('#hobbies svg')).toHaveCount(0)
  await expect(page.locator('#hobbies img')).toHaveCount(3)
  await expect(page.locator('#hobbies').getByText('Эндуро — мой личный снимок.', { exact: false })).toContainText('фотографии других спортсменов')
  for (const name of ['Плавание', 'Футбол', 'Эндуро']) {
    await expect(page.locator('#hobbies').getByRole('heading', { name })).toBeVisible()
  }
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true)
    expect(await image.evaluate(el => new URL((el as HTMLImageElement).currentSrc).origin)).toBe(new URL(page.url()).origin)
    await expect(image).toHaveCSS('object-fit', 'cover')
  }
  if (page.viewportSize()!.width <= 700) {
    const cards = await page.locator('#hobbies article').all()
    for (let index = 1; index < cards.length; index++) {
      const before = (await cards[index - 1].boundingBox())!
      const after = (await cards[index].boundingBox())!
      expect(after.y).toBeGreaterThanOrEqual(before.y + before.height)
    }
  }
  await expect(page.locator('#projects a')).toHaveCount(0)
  await expect(page.locator('main img')).toHaveCount(4)
})

test('name replaces former branding and photos recover with a stable fallback', async ({ page }) => {
  await page.route('**/photos/portrait-*.webp', route => route.abort())
  await page.route('**/photos/football-*.webp', route => route.abort())
  await page.goto('/')
  await expect(page).toHaveTitle('Антон Афанасьев | QA Engineer')
  await expect(page.locator('body')).not.toContainText(/anton\s*\.\s*dev/i)
  await expect(page.locator('header a[aria-label]')).toHaveAccessibleName('Антон Афанасьев — главная')
  await expect(page.locator('header a[aria-label]')).toContainText('АА')
  await expect(page.locator('footer')).toContainText('Антон Афанасьев')
  await expect(page.getByText('Фотография временно недоступна')).toBeVisible()
  const card = page.locator('#hobbies article[data-kind="football"]')
  await card.scrollIntoViewIfNeeded()
  await expect(card.getByText('Не удалось загрузить фотографию')).toBeVisible()
  await expect(card.getByRole('heading', { name: 'Футбол' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
