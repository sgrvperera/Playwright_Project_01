import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logoSelector = 'a.navbar-brand';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoblaze.com');
  }

  async title() {
    return this.page.title();
  }

  async isLogoVisible() {
    return this.page.isVisible(this.logoSelector);
  }
}