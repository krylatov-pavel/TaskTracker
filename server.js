'use strict';

var express = require("express");
var routes = require('./app/routes');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('./public'));

routes.configure(app);

app.listen(port);

console.log("running server on port %s", port);