const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const GMAIL_USER = { email: 'anshika@gmail.com', password: 'Iamking@000' };

async function loginAndGoToBooking(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder("you@email.com").fill(GMAIL_USER.email);
    await page.getByLabel("Password").fill(GMAIL_USER.password);
    await page.locator('#login-btn').click();
    await page.getByRole('link', { name: 'Browse Events →' }).waitFor();
    await expect(page.getByRole('main')).toContainText('Browse Events →');
}

//Format:  Shift+Alt+F
test('Assgnment 2 Test1', async ({ page }) => {
    await loginAndGoToBooking(page);

    ///--- Case 3
    await page.goto(`${BASE_URL}/events`);
    await page.waitForLoadState('networkidle');
    await page.getByText("Upcoming Events").waitFor();

    const eventCards = page.getByTestId('event-card');
    await eventCards.first().getByTestId("book-now-btn").click();
    await page.getByLabel("Full Name").fill("Alyona Dub");
    await page.getByLabel("Email").fill("gy@gmail.com");
    await page.getByLabel("Phone Number").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(BASE_URL + "/bookings");

    const bookingCards = await page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    await bookingCards.first().getByRole('button', { name: 'View Details' }).click();
    await expect(page.getByText("Event Details")).toBeVisible();


    //Step 4 — Validate booking ref
    //- Read booking ref from page -- where can I get it?
    //- Read event title from h1
    //- Assert validation : "first character of booking ref equals first character of event title"
    // Validate booking ref first letter matches event name first letter
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    /*
    Step 5 — Check refund eligibility
   - Click the Check Refund Eligibility button
   - Assert: spinner element (#refund-spinner) is immediately visible
   - Assert: spinner is no longer visible within 6 seconds
   */

    await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
    const spinner = await page.locator("#refund-spinner");
    await expect(spinner).toBeVisible();
    await expect(spinner).not.toBeVisible({ timeout: 8000 });


    /*
    Step 6 — Validate result
    - Locate result element by id #refund-result
    - Assert it is visible
    - Assert it contains text Eligible for refund
    - Assert it contains text Single-ticket bookings qualify for a full refund
    */
    const refundResult = await page.locator("#refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Eligible for refund");
    await expect(refundResult).toContainText("Single-ticket bookings qualify for a full refund");
});




test('Assgnment 2 Test2', async ({ page }) => {
    await loginAndGoToBooking(page);

    ///--- Case 3
    await page.goto(`${BASE_URL}/events`);
    await page.waitForLoadState('networkidle');
    await page.getByText("Upcoming Events").waitFor();
    const eventCards = page.getByTestId('event-card');
    await eventCards.first().getByTestId("book-now-btn").click();
    await page.locator("button:has-text('+')").dblclick();
    await page.getByLabel("Full Name").fill("Alyona Dub");
    await page.getByLabel("Email").fill("gy@gmail.com");
    await page.getByLabel("Phone Number").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(BASE_URL + "/bookings");
    const bookingCards = await page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    await bookingCards.first().getByRole('button', { name: 'View Details' }).click();
    await expect(page.getByText("Event Details")).toBeVisible();


    //Step 4 — Validate booking ref
    //- Read booking ref from page -- where can I get it?
    //- Read event title from h1
    //- Assert validation : "first character of booking ref equals first character of event title"
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator('h1').innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

    /*
    Step 5 — Check refund eligibility
   - Click the Check Refund Eligibility button
   - Assert: spinner element (#refund-spinner) is immediately visible
   - Assert: spinner is no longer visible within 6 seconds
   */
    await page.getByRole('button', { name: 'Check eligibility for refund?' }).click();
    const spinner = await page.locator("#refund-spinner");
    await expect(spinner).toBeVisible();
    await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 8000 });

    /*
    Step 6 — Validate result
    - Locate result element by id #refund-result
    - Assert it is visible
    - Assert it contains text Eligible for refund
    - Assert it contains text Single-ticket bookings qualify for a full refund
    */
    const refundResult = await page.locator("#refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Not eligible for refund.");
    await expect(refundResult).toContainText("Group bookings (3 tickets) are non-refundable.");

});