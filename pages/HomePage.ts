// pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card-block'); // demo site product card container
    this.cartLink = page.locator('#cartur'); // cart top-right
  }

  async goto() {
    await this.page.goto('https://demoblaze.com');
  }

  // Click a product by its visible name (exact match)
  async openProductByName(name: string) {
    const card = this.page.locator('.card-title').filter({ hasText: name }).first();
    await card.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}