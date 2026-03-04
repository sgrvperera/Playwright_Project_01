// pages/CartPage.ts
import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly rowsSelector = 'tr.success';

  constructor(page: Page) {
    this.page = page;
  }

  // returns an array of product names currently in cart table
  async getCartItems() {
    await this.page.waitForSelector(this.rowsSelector);
    const names = await this.page.$$eval(`${this.rowsSelector} td:nth-child(2)`, nodes =>
      nodes.map(n => (n.textContent || '').trim())
    );
    return names;
  }

  // remove first item (if you want)
  async removeFirstItem() {
    const deleteBtn = this.page.locator(`${this.rowsSelector} a`).first();
    await deleteBtn.click();
    // wait for the row to be removed
    await this.page.waitForTimeout(800);
  }
}