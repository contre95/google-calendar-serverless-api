
const {google} = require('googleapis');
const auth = require('./auth').authenticate();
const calendar = google.calendar({version: 'v3', auth});


class Event {

    constructor(calendar_id = process.env.CALENDAR_ID) {
        this.calendar_id = calendar_id
    }

    async Upcoming(mas_result = 10) {
        let events = await calendar.events.list({
            calendarId: this.calendar_id,
            timeMin: (new Date()).toISOString(),
            maxResults: mas_result,
            singleEvents: true,
            orderBy: 'startTime',
        });
        console.log("EVENTS REQUESTED");
        return events.data.items
    }


    async Get(id){
        let requested_event = await calendar.events.get(
            {
                calendarId: this.calendar_id,
                eventId: id
            }
        );
        return requested_event;
    }


    async Post(params) {
        let created_event = await calendar.events.insert({
            calendarId: this.calendar_id,
            resource: params,
        });
        console.log("NEW EVENT CREATED: ", created_event);
        return created_event
    }


    async Update(event_id, params) {
        let updated_event = await calendar.events.update(
            {
                calendarId: this.calendar_id,
                eventId: event_id,
                resource: params
            }
        );
        return updated_event;
    }
}

module.exports = Event;
