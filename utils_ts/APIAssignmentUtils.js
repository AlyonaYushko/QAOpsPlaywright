class APIAssignmentUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            { data: this.loginPayload });
        const loginResponseJson = await loginResponse.json();
        console.log(loginResponseJson);
        const token = loginResponseJson.token;
        return token;
    }

    async fetchEvents(token) {
        const eventsRes = await this.apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events",
            {
                headers: { Authorization: `Bearer ${token}` },
            });
        const eventsResponseJson = await eventsRes.json();
        console.log("eventsResponseJson=", eventsResponseJson);
        const eventId = eventsResponseJson.data[0].id;
        console.log("eventId=", eventId);
        return eventId;
    }

    async booking(token, bookingPlayload) {
        const bookingRes = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "application/json"
                },
                data: bookingPlayload,
            }
        );
        const bookingResponseJson = await bookingRes.json();
        console.log("bookingResponseJson=", bookingResponseJson);
        const dataId = bookingResponseJson.data.id;
        console.log("dataId=", dataId);
        return dataId;
    }


    async createEvent(token, eventPlayload) {
    
        const response = {};
        const createEventRes = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/events", 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "application/json"
                },
                data: eventPlayload,
            }
        );
        const createEventResponseJson = await createEventRes.json();
        console.log("createEventResponseJson=", createEventResponseJson);
        const dataId = createEventResponseJson.data.id;
        const title = createEventResponseJson.data.title;
        console.log("dataId=", dataId);
        console.log("title=", title);
        response.dataId = dataId;
        response.title=title;
        return response;
    }
}
module.exports = { APIAssignmentUtils };