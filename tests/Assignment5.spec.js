const { expect } = require('@playwright/test');
const { customtest } = require("../utils/fixturesAssignment.js");

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

customtest('Assgnment 5 Test ', async ({ authenticatedPage, createEvent }) => {

    await authenticatedPage.goto(`${BASE_URL}/events`);
    await authenticatedPage.waitForLoadState('networkidle');
    await authenticatedPage.getByText("Upcoming Events").waitFor();
    await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
});