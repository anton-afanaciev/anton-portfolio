import { test, expect } from '@playwright/test'
test('dark default, both themes persist across reload',async({page})=>{await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await page.getByRole('button',{name:'Включить светлую тему'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');await page.getByRole('button',{name:'Включить тёмную тему'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark')})
test('navigation and keyboard dismissal',async({page})=>{await page.goto('/');const menu=page.locator('button[aria-controls=site-navigation]');if(await menu.isVisible()){await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toBeFocused();await menu.click()}await page.getByRole('navigation').getByRole('link',{name:'Обо мне',exact:true}).click();await expect(page).toHaveURL(/#about$/);await expect(page.locator('#about')).toBeFocused();await expect(page.locator('#about')).toBeInViewport()})
test('motion respects system and manual setting',async({page})=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-reduced-motion','true');await expect(page.locator('html')).toHaveCSS('scroll-behavior','auto');await page.emulateMedia({reducedMotion:'no-preference'});await expect(page.locator('html')).toHaveAttribute('data-reduced-motion','false');await page.getByRole('checkbox',{name:'Уменьшить анимации'}).check();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-reduced-motion','true')})
test('all sections visible, no horizontal overflow in both themes',async({page})=>{for(const width of [320,360,390,768,1440]){await page.setViewportSize({width,height:900});await page.goto('/');for(const theme of ['dark','light']){if(await page.locator('html').getAttribute('data-theme')!==theme)await page.getByRole('button',{name:theme==='light'?'Включить светлую тему':'Включить тёмную тему'}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);await expect(page.locator('main section')).toHaveCount(7)}}})
test('storage unavailable does not break controls',async({page})=>{await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked')}})});await page.goto('/');await page.getByRole('button',{name:'Включить светлую тему'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','light')})
test('direct anchors clear the sticky header and skip link focuses main',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');await page.getByRole('heading',{level:1}).waitFor();await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Перейти к содержимому'})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 for(const id of ['about','skills','directions','projects','hobbies','contacts']){
  await page.goto('/#'+id);
  await expect.poll(()=>page.locator('#'+id).evaluate(e=>e.getBoundingClientRect().top)).toBeGreaterThanOrEqual(76);
  await expect.poll(()=>page.locator('#'+id).evaluate(e=>e.getBoundingClientRect().top)).toBeLessThan(240);
  await expect(page.locator('#'+id)).toBeInViewport();
 }

})
test('primary targets are at least 44px and menu works via keyboard',async({page})=>{
 await page.goto('/');
 for(const target of ['header a[aria-label]','header button']){
  for(const el of await page.locator(target).all()){
   if(!await el.isVisible())continue;
   const box=await el.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(44);expect(box!.height).toBeGreaterThanOrEqual(44);
  }
 }
 const menu=page.locator('button[aria-controls=site-navigation]');
 if(await menu.isVisible()){
  await page.getByRole('button',{name:'Включить светлую тему'}).focus();await page.keyboard.press('Tab');await expect(menu).toBeFocused();await page.keyboard.press('Enter');await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Shift+Tab');await expect(page.getByRole('button',{name:'Включить светлую тему'})).toBeFocused();await page.keyboard.press('Shift+Tab');await expect(page.getByRole('navigation').getByRole('link',{name:'Контакты',exact:true})).toBeFocused();await page.keyboard.press('Escape');await expect(menu).toBeFocused();
 }else{for(const el of await page.getByRole('navigation').getByRole('link').all()){const box=await el.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(44);expect(box!.height).toBeGreaterThanOrEqual(44)}}
})


