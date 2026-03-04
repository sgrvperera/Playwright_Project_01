// tests/e2e/login.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  await home.goto();

  // Use test account - we'll provide these via env (see .env.example)
  const username = process.env.TEST_USER || 'Ruchika';
  const password = process.env.TEST_PASS || '141011';

  await login.login(username, password);

  // Assert that "Welcome <username>" (nameofuser) is visible
  const loggedIn = await login.isLoggedIn();
  expect(loggedIn).toBeTruthy();
});