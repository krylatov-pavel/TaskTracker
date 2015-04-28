var express = require("express");
var app = express();
var config = require("./config/config");
var mongoose = require("mongoose-q")();
var User = require("./app/models/user")(mongoose);
var Project = require("./app/models/project")(mongoose);
var Token = require("./app/models/token")(mongoose);
var Ticket = require("./app/models/ticket")(mongoose);
var cookieParser = require("cookie-parser");
var session = require("express-session");

var bodyParser = require("body-parser");

var port = process.env.PORT || 8080;

mongoose.connect(config.dbUrl);

app.use(express.static('./public'));
app.use(cookieParser());
app.use(session({secret: config.appSecret}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes")(app, mongoose);

app.use(require("./app/handlers/errorHandler"));

app.listen(port);

console.log("running server on port %s", port);