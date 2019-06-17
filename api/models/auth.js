const {google} = require('googleapis');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;

const jwt_client = new google.auth.JWT(CLIENT_EMAIL, null, PRIVATE_KEY, ['https://www.googleapis.com/auth/calendar']);

let authenticate = () => {
    jwt_client.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successfully connected!");
        }
    });
    console.log("TUIEJA!");
    return jwt_client
};

module.exports = {
    authenticate
};
