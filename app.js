const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    let body = req.body;

    console.log('Received webhook:');
    console.dir(body, { depth: null });

    // Return a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
