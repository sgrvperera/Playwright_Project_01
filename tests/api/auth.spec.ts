// tests/api/auth.spec.ts
import { test, expect } from '@playwright/test';

const BASE = process.env.API_BASE_URL || 'https://dummyjson.com';

test.describe('API smoke (stable public endpoints)', () => {
  test('GET /products/1 returns product and 200', async ({ request }) => {
    const res = await request.get(`${BASE}/products/1`);
    expect(res.status()).toBe(200);

    const body = await res.json();
    // dummyjson product 1 should have id 1 and a title
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
  });
});