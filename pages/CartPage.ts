// pages/CartPage.ts
import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  rowsSelector = '#cartTable tbody tr';

  constructor(page: Page) {
    this.page = page;
  }

  // returns an array of product names currently in cart table
  async getCartItems() {
    try {
      // wait for cart rows (visible) with robust timeout
      await this.page.waitForSelector(this.rowsSelector, { timeout: 15000, state: 'visible' });
    } catch (e) {
      // If the page/browser has been closed, avoid calling page.content() (it throws)
      if (this.page.isClosed && this.page.isClosed()) {
        console.log('DEBUG: Page is closed — cannot capture HTML snapshot.');
        return [];
      }
      // If page still open, capture a truncated snapshot to help debug
      try {
        const html = await this.page.content();
        console.log('DEBUG: Cart page HTML snapshot (truncated):', html.slice(0, 2000));
      } catch (innerErr) {
        console.log('DEBUG: Could not get page.content():', String(innerErr).slice(0, 500));
      }
      return [];
    }

    // If rows found, return names
    const names = await this.page.$$eval(`${this.rowsSelector} td:nth-child(2)`, nodes =>
      nodes.map(n => (n.textContent || '').trim())
    );
    return names;
  }

  async removeFirstItem() {
    const deleteBtn = this.page.locator(`${this.rowsSelector} a`).first();
    await deleteBtn.click();
    await this.page.waitForTimeout(800);
  }
}