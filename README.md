# Playwright_Project_01

**Automated test suite (Playwright + TypeScript)** for a demo e-commerce app.  
This repository demonstrates professional test automation practices: E2E UI tests (Page Object Model), API tests, CI integration, artifacts (video/screenshots/reports), and debugging best practices — designed to showcase skills for freelance work on platforms like Upwork.

---

## Table of contents
- [Project Overview](#project-overview)  
- [Why this project is valuable for freelancing](#why-this-project-is-valuable-for-freelancing)  
- [Tech stack](#tech-stack)  
- [What’s included](#whats-included)  
- [Setup — run locally](#setup--run-locally)  
- [Run tests (examples)](#run-tests-examples)  
- [CI (GitHub Actions)](#ci-github-actions)  
- [Test structure & POM explanation](#test-structure--pom-explanation)  
- [How to present this project to clients / interview talking points](#how-to-present-this-project-to-clients--interview-talking-points)  
- [Common issues & debugging tips](#common-issues--debugging-tips)  
- [Next improvements / roadmap](#next-improvements--roadmap)  
- [License](#license)

---

## Project overview
This repository demonstrates how to automate testing for a small e-commerce flow:
- API tests for product endpoints (`tests/api`)
- UI E2E tests for login and add-to-cart flow using a Page Object Model (`tests/e2e` and `pages/*`)
- CI pipeline that runs tests and uploads artifacts (videos, screenshots, HTML report)

The user-facing demo site used in tests is the sample store (Demoblaze). The suite balances real-world constraints (alerts, dynamic DOM) with robust automation patterns.

---

## Why this project is valuable for freelancing
- Shows full lifecycle: test design → implementation → CI → reporting.  
- Demonstrates skills clients ask for: reliable automation, debugging flaky UI, API + UI validation.  
- Ready to show in proposals and interviews with reproducible steps and a professional README.  
- Small, focused, and extendable — easy to adapt to clients’ web apps.

---

## Tech stack
- Node.js + TypeScript  
- :contentReference[oaicite:2]{index=2} (Playwright Test runner)  
- dotenv / dotenvx for env variables  
- Git + :contentReference[oaicite:3]{index=3} (repo + Actions CI)  
- Page Object Model (POM) for maintainable tests

---

## What’s included
/
├─ pages/ # Page objects (Home, Product, Cart, Login)
├─ tests/
│ ├─ api/ # API tests (products, auth samples)
│ └─ e2e/ # E2E UI tests (login, add-to-cart)
├─ utils/ # helpers (env loader, test utilities)
├─ .github/workflows/ # GitHub Actions CI
├─ .env.example # example env vars
├─ playwright.config.ts
└─ README.md


---

## Setup — run locally

1. Clone repo
```bash
git clone https://github.com/sgrvperera/Playwright_Project_01.git
cd Playwright_Project_01

Install dependencies

npm ci

Install Playwright browsers

npx playwright install --with-deps

Create .env from .env.example and fill values (do not commit .env)

cp .env.example .env
# edit .env and add TEST_USER/TEST_PASS or API_BASE_URL if needed
Run tests (examples)

Run all tests (headless)

npx playwright test

Run tests in headed mode (watch a single run)

npx playwright test --project=chromium --headed

Run a single test file (E2E add-to-cart)

npx playwright test tests/e2e/add-to-cart.spec.ts --project=chromium --headed

Debug with Playwright Inspector

npx playwright test tests/e2e/add-to-cart.spec.ts --project=chromium --debug

View the last HTML report

npx playwright show-report reports/html
CI (GitHub Actions)

A CI workflow is included (.github/workflows/playwright.yml) that:

Installs Node and Playwright browsers

Runs the test suite

Uploads test artifacts (junit xml, HTML report, videos/screenshots)

Notes for CI

Sensitive values (e.g. TEST_USER, TEST_PASS) are stored as GitHub Secrets and injected into the job.

For UI stability in CI, the workflow config uses a single worker for UI tests where necessary.

Test structure & POM explanation

Page Object Model (POM): Every page has a class in pages/ that exposes actions and elements:

HomePage — navigation, open product, open cart

ProductPage — read title, click Add to cart

CartPage — read cart rows, remove item

LoginPage — login flow

Why POM?

Single place to maintain selectors (reduces test maintenance)

Reusable page actions make tests readable and concise

Easier to extend when the site changes

API tests

Located in tests/api, validate endpoints like GET /products and GET /products/:id.

Useful to validate backend contract without UI flakiness.