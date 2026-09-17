const base = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');
const {request} = require('@playwright/test');

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6a3ba8c6378febeacdc95c1d" }] };

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {

            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client/");
            await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
            await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
            await page.getByRole('button', { name: 'Login' }).click();
            await page.waitForLoadState('networkidle');
            await use(page);
            //tear down
            await context.close();
        },
        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APIUtils(apiContext, loginPayload);
            let response = await apiUtils.createOrder(orderPayload);
            use(response);
             //tear down
             await apiContext.dispose();
        },

        testDataForOrder : {
            productName : 'ADIDAS ORIGINAL'
        }
    }
);