// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card-block');
    this.cartLink = page.locator('#cartur');
  }

  async goto() {
    await this.page.goto('https://demoblaze.com');
  }

  async openProductByName(name: string) {
    const card = this.page.locator('.card-title').filter({ hasText: name }).first();
    await card.click();
  }

  async openCart() {
    // Click cart link and wait for the cart page to load.
    // Use waitForLoadState and then wait for a cart DOM container (tbody id or cart rows).
    await Promise.all([
      this.cartLink.click(),
      this.page.waitForLoadState('networkidle').catch(() => null),
    ]);

    // Wait for cart DOM (tbodyid or table rows) to be present (but don't throw immediately).
    await this.page.waitForSelector('#tbodyid, tr.success, .table-responsive', { timeout: 15000 }).catch(() => null);
  }
}