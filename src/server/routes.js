var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.post('/twilio', getTwilio);
router.post('/database', sendToDB)
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

var accountSid = 'AC4df2a7e90940e19b6cf30ef4827a02e2';
var authToken = "6a6359bb9d9286a44776c9b138ce24f0";
var client = require('twilio')(accountSid, authToken);

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getTwilio(req, res, next) {
    console.log(client)
    client.availablePhoneNumbers("US").local.list({ nearLatLong: req.body.lat + "," + req.body.lon,
    distance: "500" }, 
    function(err, numbers) {
        res.status(200).send(numbers.availablePhoneNumbers);
    });
}

function sendToDB(req, res, next) {
    console.log(req.body)
    res.status(200).send("SUCCESS")
}
