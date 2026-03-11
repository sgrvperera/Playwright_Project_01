// pages/ProductPage.ts
import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartBtn = 'a[onclick^="addToCart"]';
  readonly productTitle = '.name';

  constructor(page: Page) {
    this.page = page;
  }

  async getTitle() {
    return this.page.textContent(this.productTitle);
  }

  async addToCart() {
    // prepare to accept an alert if it appears
    const dialogPromise = this.page.waitForEvent('dialog').catch(() => null);

    // click add-to-cart; if a dialog appears we will accept it
    await this.page.click(this.addToCartBtn);

    const dialog = await dialogPromise;
    if (dialog) {
      try { await dialog.accept(); } catch (e) { console.log('DEBUG: dialog accept failed', String(e).slice(0,200)); }
    }

    // short, safe wait for UI to settle (not a long sleep) — remove if it causes flakiness
    await this.page.waitForTimeout(300);
  }
}