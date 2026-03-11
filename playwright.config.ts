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
    ['html', { outputFolder: 'reports/html' }]
  ],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } }
  ]
};

export default config;