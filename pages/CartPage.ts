import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItems(): Promise<string[]> {
    return await this.page.$$eval(
      '#tbodyid > tr td:nth-child(2)',
      nodes => nodes.map(n => (n.textContent || '').trim())
    );
  }
}