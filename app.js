const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const app = express();

app.use(bodyParser.json());

// Define your webhook endpoint
app.post('/webhook', (req, res) => {
    let body = req.body;

    console.log('Received webhook:');
    console.dir(body, { depth: null });

    // You can perform actions based on the webhook payload here

    // Return a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

// Function to enable Google Cloud services
function enableGoogleCloudServices() {
    exec('gcloud services enable cloudfunctions.googleapis.com', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error enabling cloudfunctions.googleapis.com: ${error}`);
            return;
        }
        console.log(`Enabled cloudfunctions.googleapis.com`);
    });

    exec('gcloud services enable cloudscheduler.googleapis.com', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error enabling cloudscheduler.googleapis.com: ${error}`);
            return;
        }
        console.log(`Enabled cloudscheduler.googleapis.com`);
    });

    exec('gcloud services enable pubsub.googleapis.com', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error enabling pubsub.googleapis.com: ${error}`);
            return;
        }
        console.log(`Enabled pubsub.googleapis.com`);
    });
}

// Enable Google Cloud services when the server starts
enableGoogleCloudServices();

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
