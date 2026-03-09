// tests/api/products.spec.ts
import { test, expect } from '@playwright/test';

const BASE = process.env.API_BASE_URL || 'https://dummyjson.com';

test.describe('Products API', () => {
  test('GET /products returns list and status 200', async ({ request }) => {
    const response = await request.get(`${BASE}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Normalize to an array: support both dummyjson (object with .products) and APIs that return an array
    const items = Array.isArray(body)
      ? body
      : body && Array.isArray(body.products)
      ? body.products
      : null;

    // debug log (keeps CI logs informative)
    console.log('Products payload type:', Array.isArray(body) ? 'array' : typeof body);
    if (!items) {
      console.log('Full response body:', JSON.stringify(body).slice(0, 2000)); // truncated for logs
    }

    expect(items, 'Expected products array in response or body.products to be an array').toBeTruthy();
    expect(items.length).toBeGreaterThan(0);

    const first = items[0];
    expect(first).toHaveProperty('id');
    
  });

  test('GET /products/:id returns correct product', async ({ request }) => {
    const id = 1;
    const res = await request.get(`${BASE}/products/${id}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    // For dummyjson product is object with id; for other APIs it's similar
    expect(body).toHaveProperty('id');
    expect(body.id).toBeDefined();
  });
});