var express = require("express");
var app = express();
var routes = require("./app/routes");
var db = require("./config/db");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.configure(app);

app.listen(port);

console.log("running server on port %s", port);