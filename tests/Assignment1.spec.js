const { test, expect } = require('@playwright/test');
const { assert } = require('console');
const { TIMEOUT } = require('dns');
const { link } = require('fs');

test('Assgnment 1', async ({ page }) => {
    const email = "anshika@gmail.com";
    const password = "Iamking@000";
    const uniqueId = Date.now();
    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Browse Events →' }).waitFor();
    await expect(page.getByRole('main')).toContainText('Browse Events →');

    await page.goto(`${BASE_URL}/admin/events`);
    await page.locator("#event-title-input").fill(String(uniqueId));
    await page.locator("#admin-event-form textarea").fill("Super event");
    await page.getByLabel("City").fill("Vinnytsia");
    await page.getByLabel("Venue").fill("Cool Venue");
    await page.getByLabel("Event Date & Time").click();
    var eventDate = formatDateTime(getFutureDate(20));
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill(eventDate);
    await page.getByLabel("Price ($)").fill("150");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await page.getByText("Event created!").waitFor();
    await expect(page.locator('body')).toContainText('Event created!');

    ///--- Case 3
    await page.goto(`${BASE_URL}/events`);
    await page.waitForLoadState('networkidle');
    await page.getByText("Upcoming Events").waitFor();

    //works properly:
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();

    const targetedCard = eventCards.filter({ hasText: uniqueId });
    await expect(targetedCard, 5000).toBeVisible();
    // //works properly using arrays:

    // const eventCards = page.getByTestId('event-card');
    // await expect(eventCards.nth(0)).toBeVisible();

    // const eventCardsCount = await eventCards.count();
    // var targetedCard;
    // // Resolve the locator to an array of individual locators
    // const eventCardsArray = await eventCards.all();
    // for (const eventCard of eventCardsArray) {
    //     const text = await eventCard.textContent();
    //     if (await text.includes(uniqueId)) {
    //         console.log("YES!");
    //         targetedCard = eventCard;
    //     }

    // }
    // await expect(targetedCard, 5000).toBeVisible();


    const innerTextTar = await targetedCard.getByText('seats available').innerText()
    var seatsBeforeNumber = parseInt(innerTextTar);
    console.log("innerTextTar =" + innerTextTar);
    console.log("seatsBeforeNumber =" + seatsBeforeNumber);

    //Step 4 — Start booking
    await targetedCard.getByTestId("book-now-btn").click();

    //Step 5 — Fill booking form
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Alyona Dub");
    await page.locator("#customer-email").fill("uAlyonaD@gmail.comb");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 8888 88888");
    await page.locator(".confirm-booking-btn").click();

    //Step 6 — Verify booking confirmation
    const bookingRefLabel = await page.locator(".booking-ref").first();
    await expect(bookingRefLabel).toBeVisible();
    const bookingRef = await (await bookingRefLabel.innerText()).trim();
    console.log("bookingRef =" + bookingRef);

    // Step 7 — Verify in My Bookings
    await page.getByRole("link", { name: "View My Bookings" }).click();
    await expect(page).toHaveURL(BASE_URL + "/bookings");
    const bookingCards = await page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    const targetedBookingCard = bookingCards.filter({
        has: page.locator('.booking-ref'),
        hasText: bookingRef.toString()
    });
    await expect(targetedBookingCard).toBeVisible();
    await expect(targetedBookingCard).toContainText(uniqueId.toString());
    //Step 8 — Verify seat reduction
    await page.goto(`${BASE_URL}/events`);
    await expect(eventCards.first()).toBeVisible();
    const afterTargetedCard = eventCards.filter({ hasText: uniqueId });
    await expect(afterTargetedCard, 5000).toBeVisible();
    const innerTextTarAfterBooking = await afterTargetedCard.getByText('seats available').innerText()
    var seatsAfterBooking = parseInt(innerTextTarAfterBooking);
    console.log("innerTextTarAfterBooking =" + innerTextTarAfterBooking);
    console.log("seatsAfterBooking =" + seatsAfterBooking);
    await expect(seatsAfterBooking).toBe(seatsBeforeNumber - 1);

});

function getFutureDate(daysToAdd) {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysToAdd);
    console.log("today=" + today);    // Original date stays intact
    console.log("futureDate=" + futureDate); // Exactly 24 hours later
    return futureDate;
}

function formatDateTime(date) {

    const dateConverted = new Date(date);
    const pad = (num) => String(num).padStart(2, '0');

    const yyyy = dateConverted.getFullYear();
    const MM = pad(dateConverted.getMonth() + 1);
    const dd = pad(dateConverted.getDate());
    const HH = pad(dateConverted.getHours());
    const mm = pad(dateConverted.getMinutes());

    return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
}