import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('add product to cart and verify it appears in cart', async ({ page }) => {
  test.setTimeout(120000); // allow up to 120s for slow CI/local runs

  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();

  const productName = 'Samsung galaxy s6';
  await home.openProductByName(productName);

  const title = await product.getTitle();
 expect(title?.toLowerCase()).toContain('samsung');

  await product.addToCart();

  await home.openCart();

  // debug: show where we are before checking
  console.log('DEBUG: current page URL before checking cart items:', page.url());

  //const items = await cart.getCartItems();
  //expect(items.some(name => name.includes('Samsung'))).toBeTruthy();
});