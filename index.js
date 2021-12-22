const fs = require('fs');
const express = require('express');

let app = require('express')();
let http = require('http').Server(app);
let bodyParser = require('body-parser');

let port = process.env.PORT || 3000;
let io = require('socket.io')(http);
let nodemailer = require('nodemailer');

// REPL DATABASE
const Database = require("@replit/database");
const db = new Database();

const rp = require('request-promise');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'thenewrobotfortheexurb@outlook.com',
    pass: process.env.PWD
  }
});

app.get('', function (req, res) {
  const index = __dirname + '/public/static/index.html';

  res.sendFile(index);
});

app.get('/student-zone', function (req, res) {
  const szone = __dirname + '/public/static/szone.html';

  res.sendFile(szone);
});

app.get('/letters-to-the-editor', function (req, res) {
  const editors = __dirname + '/public/static/editors.html';

  res.sendFile(editors);
});

app.get('/scanner', function (req, res) {
  const scanner = __dirname + '/public/static/scanner.html';

  res.sendFile(scanner);
});

app.get('/feed', function (req, res) {
  const feed = __dirname + '/public/static/feed.html';

  res.sendFile(feed);
});

app.get('/arcade', function (req, res) {
  const arcade = __dirname + '/public/static/arcade.html';

  res.sendFile(arcade);
});

app.get('/ads', function (req, res) {
  const ads = __dirname + '/public/static/ads.html';

  res.sendFile(ads);
});

let temp_guest = "";
let count = 0;

setInterval(function () {
  temp_guest = "";
  count = 0;
}, 1000);

app.post('/getlinks', async function (req, res) {
  const url = req.body.url;
 
  rp(url)
  .then(function (html) {
    res.send(html);
    console.log(html);
    console.log(" ");
  })
  .catch(function (err) {
    throw err;
  });
});

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

let thing = "";

app.post('/szone', function (req, res) {
  let guest = req.ip;
  temp_guest = guest;

  const username = req.body.username;
  const clean_user = DOMPurify.sanitize(username);
  const message = req.body.message;
  const clean_message = DOMPurify.sanitize(message);

  count += 1;
  let smh = "";

  thing = "<p class='username'>" + clean_user + "</p><hr class='line'/><p class='msg'>" + clean_message + "</p><br/>" + thing;

  res.send(thing);
});

setInterval(function () {
  db.set("szone", thing).then(() => {
    console.log("UPDATED SZONE");
  });
}, 5000);

db.get("szone").then(value => {
  thing = value;
});

app.get('/posts', function (req, res) {
    function getValue () {
      db.get("szone").then(value => {
        return value;
      });
    }

  res.send(thing);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});