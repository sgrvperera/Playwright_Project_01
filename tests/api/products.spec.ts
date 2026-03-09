// tests/api/products.spec.ts
import { test, expect } from '@playwright/test';

const BASE = process.env.API_BASE_URL || 'https://fakestoreapi.com'; // use a real API in client projects

test.describe('Products API', () => {
  test('GET /products returns list and status 200', async ({ request }) => {
    const response = await request.get(`${BASE}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    // quick schema-ish checks
    expect(body.length).toBeGreaterThan(0);
    const first = body[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
  });

  test('GET /products/:id returns correct product', async ({ request }) => {
    // pick a known id; for real API adapt dynamically
    const id = 1;
    const response = await request.get(`${BASE}/products/${id}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(id);
    expect(body).toHaveProperty('title');
  });
});