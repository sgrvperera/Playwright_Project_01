# Playwright_Project_01

A production-oriented Playwright automation framework built with **TypeScript** for a demo e-commerce application.  
This project demonstrates a practical test automation setup that combines:

- **UI end-to-end testing** using the **Page Object Model (POM)**
- **API testing** for backend validation
- **Cross-browser execution** with Chromium, Firefox, and WebKit
- **CI/CD integration** with GitHub Actions
- **Reports, screenshots, videos, and test artifacts** for debugging and traceability

The repository is designed to show real automation engineering practices in a way that is easy to understand, maintain, and extend.

---

## Table of Contents

- [Overview](#overview)
- [What This Project Covers](#what-this-project-covers)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
- [Test Reports and Artifacts](#test-reports-and-artifacts)
- [GitHub Actions CI](#github-actions-ci)
- [Playwright Configuration Explained](#playwright-configuration-explained)
- [Page Object Model Explained](#page-object-model-explained)
- [Debugging and Troubleshooting](#debugging-and-troubleshooting)
- [Recommended Workflow](#recommended-workflow)
- [Roadmap / Possible Improvements](#roadmap--possible-improvements)
- [License](#license)

---

## Overview

This repository is a Playwright + TypeScript automation project for a sample e-commerce application.  
It is built to demonstrate how to structure a professional automation framework that is suitable for:

- portfolio projects
- freelance client demonstrations
- interview discussions
- CI/CD-based test execution
- reliable regression testing

The framework includes both **UI** and **API** automation. UI tests are organized using the **Page Object Model**, which keeps selectors and user actions inside page classes instead of mixing them directly into test scripts.

---

## What This Project Covers

### UI End-to-End Automation
The project contains UI tests for common user journeys such as:

- logging in
- opening product pages
- adding items to the cart
- verifying cart behavior

### API Automation
API tests validate backend endpoints such as product-related requests.  
This helps confirm that the service layer behaves correctly even before the UI is involved.

### CI Integration
A GitHub Actions workflow runs the tests automatically on push and pull request events.  
It also uploads useful artifacts such as:

- JUnit XML results
- HTML report
- screenshots
- videos

### Debug-Friendly Test Output
The Playwright configuration is set up to help diagnose failures with:

- screenshots on failure
- videos on failure
- HTML reporting
- JUnit reporting

---

## Technology Stack

- **Node.js**
- **TypeScript**
- **Playwright Test**
- **dotenv**
- **GitHub Actions**
- **Page Object Model (POM)**

### Playwright Features Used
- Multi-browser testing
- Headless execution
- Screenshot capture on failure
- Video recording on failure
- HTML and JUnit reports
- CI-friendly retries

---

## Project Structure

```text
Playwright_Project_01/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── CartPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── ProductPage.ts
├── tests/
│   ├── api/
│   └── e2e/
├── utils/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

### Folder Purpose

- **pages/**  
  Contains reusable page classes for the UI tests.

- **tests/e2e/**  
  Contains end-to-end UI tests.

- **tests/api/**  
  Contains API-level tests.

- **utils/**  
  Holds shared helper code such as environment loading.

- **.github/workflows/**  
  Contains the GitHub Actions CI workflow.

- **playwright.config.ts**  
  Contains Playwright test runner settings.

- **.env.example**  
  Example environment variables file.

---

## Prerequisites

Before running this project locally, make sure you have:

- **Node.js 20+**
- **npm**
- **Git**
- A supported browser environment for Playwright

> Playwright can install browser binaries and system dependencies automatically using its install command.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sgrvperera/Playwright_Project_01.git
cd Playwright_Project_01
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

The `--with-deps` flag is especially useful on Linux because it installs browser dependencies needed for CI and clean local setups.

---

## Environment Configuration

This project uses environment variables for test configuration.

### Create a local `.env` file

```bash
cp .env.example .env
```

### Typical values used by the project

```env
API_BASE_URL=https://dummyjson.com
TEST_USER=your_test_username
TEST_PASS=your_test_password
```

### Notes
- Do **not** commit `.env` to GitHub.
- Store real credentials in **GitHub Secrets** when running CI.
- `API_BASE_URL` is pinned in CI to keep API tests stable.

---

## Running Tests

The project uses the Playwright Test Runner.

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests on a single browser project

```bash
npx playwright test --project=chromium
```

### Run a specific test file

```bash
npx playwright test tests/e2e/add-to-cart.spec.ts
```

### Run a specific test file in headed mode

```bash
npx playwright test tests/e2e/add-to-cart.spec.ts --project=chromium --headed
```

### Debug mode

```bash
npx playwright test tests/e2e/add-to-cart.spec.ts --project=chromium --debug
```

### View the HTML report

```bash
npx playwright show-report reports/html
```

---

## Package Scripts

The `package.json` file includes these scripts:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:headed": "npx playwright test --headed",
    "test:report": "npx playwright show-report",
    "test:ci": "npx playwright test --reporter=list,junit"
  }
}
```

### Script meaning

- **npm run test**  
  Runs the full Playwright test suite.

- **npm run test:headed**  
  Runs tests with the browser window visible.

- **npm run test:report**  
  Opens the latest HTML report.

- **npm run test:ci**  
  Runs tests with list + JUnit output, which is helpful for CI systems.

---

## Test Reports and Artifacts

This project generates multiple types of output to help with analysis and debugging.

### Reports generated locally or in CI
- **List reporter** for console output
- **JUnit XML** for CI-friendly reporting
- **HTML report** for interactive review

### Failure artifacts
When a test fails, Playwright can capture:

- **screenshots**
- **videos**

These files are especially useful when diagnosing:
- timing issues
- selector failures
- unexpected redirects
- authentication problems
- environment-specific issues in CI

### Important note about videos/screenshots
In the current Playwright configuration, media is collected **only on failure**:

```ts
screenshot: 'only-on-failure',
video: 'retain-on-failure'
```

That means:
- passing tests do **not** create screenshots or videos
- failing tests create media automatically
- CI upload steps should target the test output folder carefully

---

## GitHub Actions CI

The repository includes a GitHub Actions workflow at:

```text
.github/workflows/playwright.yml
```

### What the CI workflow does
- checks out the repository
- sets up Node.js 20
- installs dependencies using `npm ci`
- installs Playwright browsers and OS dependencies
- prints useful environment debug information
- runs the Playwright tests
- uploads reports and artifacts

### CI environment variables
The workflow uses:

- `API_BASE_URL` set to `https://dummyjson.com`
- `TEST_USER` from GitHub Secrets
- `TEST_PASS` from GitHub Secrets

### Why this matters
Using secrets in CI keeps sensitive values out of the repository while still allowing test automation to run in GitHub Actions.

### CI reliability choices
The Playwright configuration uses:
- **single worker** for stability
- **retries in CI**
- **headless execution**
- **report generation**

These choices reduce flakiness and make CI results more consistent.

---

## Playwright Configuration Explained

The main Playwright config is in `playwright.config.ts`.

### Key settings in this project

#### Test directory
```ts
testDir: 'tests'
```
Playwright looks for tests inside the `tests/` folder.

#### Timeout
```ts
timeout: 30000
```
Each test has a 30-second timeout.

#### Retries
```ts
retries: process.env.CI ? 2 : 0
```
Tests retry twice in CI and do not retry locally unless you change the config.

#### Workers
```ts
workers: 1
```
The tests run with a single worker, which helps avoid race conditions and improves stability for UI flows.

#### Reporters
```ts
reporter: [
  ['list'],
  ['junit', { outputFile: 'test-results/junit-results.xml' }],
  ['html', { outputFolder: 'reports/html' }]
]
```

This means the framework produces:
- a console list report
- a JUnit XML file
- an HTML report saved under `reports/html`

#### Browser settings
```ts
use: {
  headless: true,
  viewport: { width: 1280, height: 720 },
  actionTimeout: 10000,
  ignoreHTTPSErrors: true,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

#### Supported browser projects
```ts
projects: [
  { name: 'chromium', use: { browserName: 'chromium' } },
  { name: 'firefox', use: { browserName: 'firefox' } },
  { name: 'webkit', use: { browserName: 'webkit' } }
]
```

This gives you cross-browser coverage across the main browser engines.

---

## Page Object Model Explained

The `pages/` directory contains page classes that hide selectors and page actions from the tests.

### Included page objects

#### `HomePage.ts`
Used for navigation and opening product/cart-related areas.

#### `ProductPage.ts`
Used for product-level actions such as reading product information and adding items to the cart.

#### `CartPage.ts`
Used for cart validation and cart interactions.

#### `LoginPage.ts`
Used for authentication-related actions.

### Why POM is used here
Page Object Model improves maintainability because:

- selectors are stored in one place
- tests become easier to read
- common actions can be reused
- UI changes are easier to update
- the framework looks more professional to clients and employers

### Example benefit
Instead of repeating long selector logic in every test, the test can call a simple method like:

```ts
await loginPage.login(username, password);
```

That keeps test cases clean and business-focused.

---

## Debugging and Troubleshooting

### 1. No screenshots or videos uploaded in CI
This usually happens when no test fails.

Because media is configured for failures only:
- passed tests do not generate media
- the artifact upload step may find no files

If you want media for every run, change:
```ts
screenshot: 'on'
video: 'on'
```

### 2. Workflow says no files were found
This means the upload path does not match the actual output directory or no media was generated.

Common checks:
- verify the artifact path
- verify Playwright output settings
- make sure the test actually failed if media is failure-only

### 3. Browser installation issues
Run:
```bash
npx playwright install --with-deps
```

### 4. Environment variable issues
Make sure `.env` is present locally and GitHub Secrets are configured in CI.

### 5. Flaky UI tests
Use:
- stable selectors
- POM
- explicit waits only when needed
- single worker in CI
- retries in CI

---

## Recommended Workflow

A simple professional workflow for this project is:

1. Update code in `pages/`, `tests/`, or `utils/`
2. Run tests locally
3. Review the HTML report
4. Fix any failing selectors or assertions
5. Push changes to GitHub
6. Let GitHub Actions run the CI pipeline
7. Review uploaded artifacts for failures

This is a realistic workflow used in professional test automation projects.

---

## How to Present This Project

When describing this project to a client, interviewer, or recruiter, you can say:

> This is a Playwright + TypeScript automation framework built with a maintainable Page Object Model structure. It includes UI and API testing, runs in CI through GitHub Actions, and captures reports, screenshots, and videos to support debugging and traceability.

You can also mention:
- cross-browser support
- stable CI execution
- reusable page objects
- failure evidence through artifacts
- environment-based configuration

---

## Roadmap / Possible Improvements

Possible future enhancements for this repository:

- add trace upload in CI
- add data-driven tests
- add custom assertions/helpers
- improve artifact paths in GitHub Actions
- add test tagging for smoke/regression runs
- add parallel-safe test partitioning
- add environment-specific configuration for staging and production
- add a README badge section for build status and test status

---

## License

This project is currently licensed under **ISC** as defined in `package.json`.

---

## Contact / Usage Notes

This repository is suitable for:
- learning Playwright
- demonstrating real-world automation structure
- freelance automation proposals
- interview portfolio work
- CI/CD automation demos

If you extend the project, keep the README aligned with the actual code structure so it remains accurate and professional.
