import { PlaywrightTestConfig } from '@playwright/test';
import './utils/env';

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0, // retry in CI to reduce flakes
  workers: 1, // 🛑 Force single worker for UI tests
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['html', { outputFolder: 'reports/html' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    
  ]
};

export default config;