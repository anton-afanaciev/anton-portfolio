import { test, expect } from '@playwright/test'

test('Pages subpath serves scripts, styles, favicon and responsive photos in both themes', async ({ page, request }) => {
  const failures: string[] = []
  page.on('pageerror', error => failures.push(error.message))
  page.on('requestfailed', req => failures.push(`${req.url()}: ${req.failure()?.errorText}`))
  page.on('response', response => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('./')
  expect(new URL(page.url()).pathname).toBe('/anton-portfolio/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Антон')
  for (const theme of ['dark', 'light']) {
    if (await page.locator('html').getAttribute('data-theme') !== theme) {
      await page.getByRole('button', { name: theme === 'light' ? 'Включить светлую тему' : 'Включить тёмную тему' }).click()
    }
    await expect(page.locator('main img')).toHaveCount(4)
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0)).toBe(true)
      expect(await img.evaluate(el => new URL((el as HTMLImageElement).currentSrc).pathname)).toMatch(/^\/anton-portfolio\/photos\//)
    }
  }
  const resources = await page.locator('script[src], link[rel="stylesheet"], link[rel="icon"]').evaluateAll(elements =>
    elements.map(el => el.getAttribute('src') ?? el.getAttribute('href')!))
  expect(resources.length).toBeGreaterThanOrEqual(3)
  for (const url of resources) {
    expect(url).toMatch(/^\/anton-portfolio\//)
    const response = await request.get(new URL(url, page.url()).href)
    expect(response.ok(), url).toBe(true)
    expect(response.headers()['content-type'], url).toMatch(/javascript|css|image\/svg\+xml/)
  }
  expect(failures).toEqual([])
})
