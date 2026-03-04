// tests/e2e/add-to-cart.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('add product to cart and verify it appears in cart', async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();

  // Choose a product name that exists on demoblaze (example: "Samsung galaxy s6")
  const productName = 'Samsung galaxy s6';
  await home.openProductByName(productName);

  // verify product page title contains productName (or at least fetch title)
  const title = await product.getTitle();
  expect(title?.toLowerCase()).toContain('samsung');

  // add to cart (handles alert)
  await product.addToCart();

  // go to cart and assert the product appears
  await home.openCart();
  const items = await cart.getCartItems();
  expect(items.some(name => name.includes('Samsung'))).toBeTruthy();
});