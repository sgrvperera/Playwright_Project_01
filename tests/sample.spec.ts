import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('homepage loads and shows logo', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await expect(home.page).toHaveTitle(/STORE/);
  expect(await home.isLogoVisible()).toBeTruthy();
});