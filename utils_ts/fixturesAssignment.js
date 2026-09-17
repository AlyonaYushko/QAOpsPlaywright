const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APIAssignmentUtils } = require('./APIAssignmentUtils');

const eventPlayload = { title: "Event A", description: "trtyr", category: "Concert", venue: "Venu", city: "Vinnytsia", eventDate: "2026-08-30T13:50:00.000Z", price: "15", totalSeats: "1111" };
const CREDENTIALS_USER_A = { email: "anshika@gmail.com", password: "Iamking@000" };

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://eventhub.rahulshettyacademy.com/login");

            await page.getByPlaceholder("you@email.com").fill(CREDENTIALS_USER_A.email);
            await page.getByLabel("Password").fill(CREDENTIALS_USER_A.password);
            await page.locator("#login-btn").click();
            await page.waitForLoadState('networkidle');
            await use(page);
            //tear down
            await context.close();
        },
        createEvent: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIAssignmentUtils(apiContext, CREDENTIALS_USER_A);
            const token = await apiUtils.getToken(CREDENTIALS_USER_A);
            let response = await apiUtils.createEvent(token, eventPlayload);
            use(response);
            //tear down
            await apiContext.dispose();
        }
    }
);