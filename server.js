// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/", function (req, res) {
  date = new Date();
  console.log(date);
  res.json({ "unix": new Date().getTime(), "utc": new Date().toUTCString() });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  var date = req.params.date_string;
  console.log('parsed date result ', Date.parse(1451001600000));
  if (date.length <= 0) {
    date = new Date();
  } else if (new Date(date) > 0) {
    var myDate = new Date(date);
    res.json({ "unix": myDate.getTime(), "utc": myDate.toUTCString() });
  } else if (new Date(parseInt(date)).getTime() > 0) {
    var myDate = new Date(parseInt(date));
    res.json({ "unix": myDate.getTime(), "utc": myDate.toUTCString() });
  } else {
    res.json({ "error": "Invalid Date" });
  }
});

// listen for requests :)
// TODO RETURN 4000 INTO process.env.PORT when finishing
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
