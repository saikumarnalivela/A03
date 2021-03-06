const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')  // NEW - this is required
const app = express()  // make express app
//const http = require('http').Server(app)  // inject app into the server

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 manage our entries
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request (not required to fully work)
// 6 respond with 404 if a bad URI is requested

// Listen for an application request on port 8081
// http.listen(8081, function () {
//   console.log('app listening on http://127.0.0.1:8081/')
// })
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 include public assets and use bodyParser
// Node uses __dirname for the The directory name of the current module.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
// see https://github.com/expressjs/morgan for more
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));
// 4 http GET default page at /
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })
 
 // 4 http GET /tic-tac-toe
 app.get("/tic-tac-toe", function (req, res) {
  res.render("tic-tac-toe.ejs")
 })
 
 // 4 http GET /about
 app.get("/about", function (req, res) {
  res.render("contact.ejs")
 })
 
 // 4 http GET /contact
 app.get("/contact", function (req, res) {
  res.render("contact.ejs")
 })
// 5 http POST /contact
app.post("/contact", function (req, res) {
  var api_key = 'a584ef2521670c3e7c1cb4b72854e5de-4836d8f5-c4d3ae47';
        var domain = 'sandbox23ca2e15728b4da7a2c54cc6d2d15089.mailgun.org';
        var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  const name = req.body.inputname;
  const email = req.body.inputemail;
  const company = req.body.inputcompany;
  const comment = req.body.inputcomment;
  const isError = true;
 
  // setup e-mail data with unicode symbols
  var data = {
    from: 'mail from <postmaster@sandbox23ca2e15728b4da7a2c54cc6d2d15089.mailgun.org>',
    to: 'sainalivela@gmail.com',
    subject: 'Mail to praise your work',
    text: 'Testing some Mailgun awesomeness!'
  };
  
 
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
    res.send('data has been recored')
    else
    res.send('bye!!')
  // logs to the terminal window (not the browser)
  //console.log('\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + comment + '\n');
  });      
})
  // 6 this will execute for all unknown URIs not specifically handled
app.get(function (req, res) {
  res.render("404")
 }) 
 
 // Listen for an application request on designated port
 app.listen(process.env.PORT || 8081, function () {
  console.log('Web app started and listening on http://localhost:8081')
 })