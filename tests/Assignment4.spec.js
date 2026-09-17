const { test, expect, request } = require('@playwright/test');
const { APIAssignmentUtils } = require('../utils/APIAssignmentUtils');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const CREDENTIALS_USER_A = { email: 'alyonatest1@gmail.com', password: 'Iamking@000' };
const CREDENTIALS_USER_B = { email: 'alyonatest2@gmail.com', password: 'Iamking@000' };

async function loginAndGoToBooking(page, userCredentials) {
   await page.goto(`${BASE_URL}/login`);
   await page.getByPlaceholder("you@email.com").fill(userCredentials.email);
   await page.getByLabel("Password").fill(userCredentials.password);
   await page.locator('#login-btn').click();
   await page.getByRole('link', { name: 'Browse Events →' }).waitFor();
   await expect(page.getByRole('main')).toContainText('Browse Events →');
}

test('Assgnment 4 Test1 ', async ({ page }) => {
   const apiContext = await request.newContext();
   const apiUtils = new APIAssignmentUtils(apiContext, CREDENTIALS_USER_A);
   const tokenUserA = await apiUtils.getToken();
   const eventId = await apiUtils.fetchEvents(tokenUserA);
   console.log("eventId from test =", eventId);
   const bookingPayload = { customerName: "3423", customerEmail: `${CREDENTIALS_USER_A.email}`, customerPhone: "+91234567890", quantity: "1", eventId: `${eventId}` };
   const bookingId = await apiUtils.booking(tokenUserA, bookingPayload);
   await loginAndGoToBooking(page, CREDENTIALS_USER_B);
   await page.goto(`${BASE_URL}/bookings/${bookingId}`);
   await page.waitForLoadState('networkidle');
   await expect(page.getByText("Access Denied")).toBeVisible();
   await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();
   await apiContext.dispose();
});