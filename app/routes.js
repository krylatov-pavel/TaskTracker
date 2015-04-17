module.exports = function(app, mongoose) {
    var express = require("express");
    var router = express.Router();
    var projects = require("./controllers/projectsCtrl")(mongoose);

    app.use("/api/projects", projects);
};