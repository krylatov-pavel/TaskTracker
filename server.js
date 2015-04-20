var express = require("express");
var app = express();
var db = require("./config/db");
var mongoose = require("mongoose-promised");
var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes")(app, mongoose);

app.use(require("./app/handlers/errorHandler"));

app.listen(port);

console.log("running server on port %s", port);