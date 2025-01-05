const express = require("express");
require("dotenv").config();
let app = express();
let bodyParser = require("body-parser");

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// localhost:3000
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// Serve an HTML file
app.get("/views/index.html", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Serve static assets
app.use("/public", express.static(__dirname + "/public"));

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});


//JSON response
app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Chain Middleware to Create a Time
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Get Route Parameter Input from the client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

module.exports = app;
