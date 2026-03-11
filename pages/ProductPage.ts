import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getTitle(): Promise<string | null> {
    try {
      const titleEl = await this.page.locator('h2.name').first();
      return await titleEl.textContent();
    } catch (err: unknown) {
      if (err instanceof Error) console.log('DEBUG: getTitle error:', err.message);
      else console.log('DEBUG: getTitle unknown error:', err);
      return null;
    }
  }

  async addToCart() {
    const addBtn = this.page.locator('a:has-text("Add to cart")').first();
    await addBtn.click();
  }
}