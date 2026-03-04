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

  // Click add-to-cart and accept the browser alert
  async addToCart() {
    // demoblaze triggers a browser alert - handle it
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await this.page.click(this.addToCartBtn);
    // small pause to ensure cart action completes (or use waitForResponse if API known)
    await this.page.waitForTimeout(1000);
  }
}