const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const Event = require('../models/event');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/event/:id', async (req, res) => {
    let calendar_id = req.query.calendar_id;
    const { id } = req.params;
    let event = new Event(calendar_id);
    try {
        const requested_event = await event.Get(id);
        res.status(200).send(requested_event)
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

});

app.get('/event/', async (req, res) => {
    let max_results = req.query.max_results;
    let calendar_id = req.query.calendar_id;
    let event = new Event(calendar_id);
    try {
        const events = await event.Upcoming(max_results);
        res.status(200).send(events);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});


app.post('/event/', async (req, res) => {
    let event = new Event(req.body.calendar_id);
    try {
        const created_event = await event.Post(req.body.event);
        // const event_link = "asd"
        res.status(200);
        res.send(created_event);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


app.put('/event/:id', async (req, res) => {
    const { id } = req.params;
    let event = new Event(req.body.calendar_id);
    try {
        const updated_event = await event.Update(id, req.body.event);
        res.status(200).send(updated_event);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

});

// Handle invalid route
app.all('*', function (req, res) {
    const response = {data: null, message: 'Route not found!!'};
    res.status(400).send(response)
});

// wrap express app instance with serverless http function
module.exports.handler = serverless(app);
