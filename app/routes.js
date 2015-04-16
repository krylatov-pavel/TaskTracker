var express = require("express");
var router = express.Router();
var projects = require("./controllers/projectsCtrl");
var tickets = require("./controllers/ticketsCtrl");

function configure (app){
    app.use("/api/projects", projects);
    app.use("/api/tickets", tickets);
}

module.exports = {
    configure: configure
};