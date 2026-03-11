import { test, expect } from '@playwright/test';

test('add product to cart', async ({ page }) => {

  await page.goto('https://demoblaze.com');

  await page.click('text=Samsung galaxy s6');

  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  await page.click('text=Add to cart');

  // Just confirm alert happened
  await page.waitForTimeout(2000);

  await page.click('#cartur');

  await expect(page).toHaveURL(/cart/);
});