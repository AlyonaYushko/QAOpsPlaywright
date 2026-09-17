
import { chromium, firefox, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 130 * 1000,
  retries: 2,
  // workers: 1,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects:
    [{
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',//'retain-on-failure',
      },
    },
    {
      name: "firefox",
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        video: 'retain-on-failure',
        trace: 'on',//'retain-on-failure'
        ignoreHttpsErrors: true,
        permissions:['geolocation'],
        //viewport:{width:720, height:720}
      },
    }

    ]



});

module.exports = config;

