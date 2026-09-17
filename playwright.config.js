
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 100 * 1000,
  expect: {
    timeout: 5000,
  },
  //reporter: 'html',
reporter: [
    ['line'],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'//'retain-on-failure'
  },




});

module.exports = config;

