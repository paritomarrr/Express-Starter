// imports express in our file
var express = require("express");

// assigned 'app' to express
var app = express();
var things = require("./things.js");

// pug for template engine
app.set("view engine", "pug");
app.set("views", "/views");


app.get('/first_template', function(req, res) {
    res.render('first')
})
// app.method(path, handler)
// HTTP verbs - get, set, put, delete

// app.get(route, callback)
// GET REQUEST
// Callback function has 2 parameters
// request and response
// request -> HTTP req has propertiess for the req query string, parameters, body, HTTP Headers
// response -> result from HTTP request
// res.send -> function that takes an object as input and it sends this to the requesting client
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/pari", (req, res) => {
  res.send("Testing te route for Pari");
});

// dynamic route
app.get("/:id", function (req, res) {
  res.send("The id you specified is " + req.params.id);
});

app.get("/things/:name/:id", function (req, res) {
  res.send("id: " + req.params.id + " and name: " + req.params.name);
});

// middleware
app.use("/", function (req, res, next) {
  console.log("A new request received at " + Date.now());
  next();
});

// both index.js and things.js should be in same directory
app.use("/things", things);
// all method is to handle all types of HTTP methods at a particular route using same function
app.all("/test", function (req, res) {
  res.send("HTTP method doesnt have any effect on this route!");
});

// use CMD
// curl -X POST "http://localhost:3000/pari"
// curl stands for client URL
app.post("/pari", function (req, res) {
  res.send("you just called the post method at '/pari'! \n");
});

// app.listen(port, host, backlogs, callback)
// port -> port number on which server should accept incoming req
// host -> name of domain; used when deployed your apps to the cloud
// backlogs -> max number of queued pending connections. Default is 511
// callback -> async function that is called when the server starts listening for requests
app.listen(3000);
