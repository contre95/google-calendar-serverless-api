# Google Calendar API 

The aim of this project is to create a Google Calendar API Service that abstracts away the complexity of the google calendar API. Letting other APIs and Scripts create, retrieve, update and delete Events for a single a calendar.


## Getting Started

### Create the Service Account
In order to be able to access Google Services, go to [Google Developers Console](https://console.developers.google.com/) and create a new project.
On the left menu, select ***Credentials*** , then ***Create credentials***. Select ***Service account key*** from the type of credentials list. After this, choose ***New service account***, **JSON** as a private key type and hit **Create** button which will trigger the download of the JSON private key.
Then `cp` those `privatekeys.json` into `./config/privatekeys.json`. These keys would then be accessed by the `serverles.yml` to run the `lambda` function with information needed to authenticate as environment variables.
### Enable the Calendar API 
Then you will need to enable the APIs which will be used with this service account. To do that, select Library from the left menu and then search for “*Google Calendar API*” and press the **Enable** button
### Grant the Service Account access to the API
The access is granted by assigning permissions to the service account, using its email address. In the case of the Google Calendar API you can share the complete calendar or single events from the Calendar App.

### Prerequisites
To run this service you will need to have [Node JS](https://nodejs.org/en/). and `npm` or any other package manager.

### Installing
Clone the repo and `cd` to the folder. The run the following commands:
```
$ sudo npm install serverless -g
$ sudo npm install
```



## Running development
```
$ sls offline start
```
This should prompt something like this:
``` 
Serverless: Starting Offline: dev/us-east-1.

Serverless: Routes for eventsHandler:
Serverless: GET /event
Serverless: GET /event/{id}
Serverless: POST /event
Serverless: PUT /event/{id}
Serverless: POST /{apiVersion}/functions/calendar-api-dev-eventsHandler/invocations

Serverless: Offline listening on http://localhost:3000
```

## Deployment
You will need to have the `awscli` installed and previously generated a key pair. In order to configure your aws profile with `$ aws configure`.
Once configured you can deploy everything with.
```
$ sls deploy 
```
You can optionally add the `--verbose` flag to debug any errors if any.
## Usage
####Pourpose 
This API is intended to let other scripts easily create and modify events for a given calendar created beforehand and specified in the configurations files before the deployment.
Nevertheless, the calendar and be easily change by sending it as a parameter of the http request.
####POST and specific event:
```
curl -X POST -H "Content-Type: application/json" -d @example-payload.json localhost:3000/event | jq
``` 
####UPDATE an event:
```
curl -X PUT -H "Content-Type: application/json" -d @example-payload.json localhost:3000/event/customid123123 | jq
```
####GET the upcoming events:
```
curl -X GET 'http://localhost:3000/event?max_result=10' | jq
```
**Note:** Please notice that a good way of keeping track of the events created is to `POST` an event with a custom id otherwise the id is automatically created by the Calendar API.
For event IDs and further parameter constraints please refer to the [Google Calendar API reference](https://developers.google.com/calendar/v3/reference/events/insert)

## Built With
* [Serverless Framework](https://serverless.com/) - The web framework used
* [Google Calendar API](https://developers.google.com/calendar/) - 
* [googleapi](https://www.npmjs.com/package/googleapis) - The npm module used to communicate with the Calendar API
* [Google Developers Console](https://console.developers.google.com/) - Console to set up the interaction with the calendar API


## Authors

* **Lucas Contreras**  | Github [@contre95](https://github.com/contre95)

## License

This project is licensed under the MIT License 

