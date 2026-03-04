// pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginLink = 'a#login2';
  readonly usernameInput = '#loginusername';
  readonly passwordInput = '#loginpassword';
  readonly loginBtn = 'button[onclick="logIn()"]';
  readonly loggedUser = '#nameofuser';

  constructor(page: Page) {
    this.page = page;
  }

  async openLoginModal() {
    await this.page.click(this.loginLink);
    await this.page.waitForSelector(this.usernameInput, { state: 'visible', timeout: 5000 });
  }

  // Perform login and wait for the logged-in indicator to be visible and contain username
  async login(username: string, password: string) {
    await this.openLoginModal();

    // fill inputs
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);

    // attach dialog handler to accept any alerts that appear (success/failure)
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    // click login, then wait for the "nameofuser" to be visible (longer timeout)
    await this.page.click(this.loginBtn);
    await this.page.waitForSelector(this.loggedUser, { state: 'visible', timeout: 10000 });

    // optional: return the shown username text
    return (await this.page.textContent(this.loggedUser))?.trim() || '';
  }

  async isLoggedIn() {
    return this.page.isVisible(this.loggedUser);
  }
}