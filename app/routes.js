module.exports = function(app, mongoose) {
    var express = require("express");
    var router = express.Router();
    var projects = require("./controllers/projectsCtrl")(mongoose);
    var auth = require("./controllers/authCtrl")(mongoose);

    app.use(auth.passport.initialize());
    app.use(auth.passport.session());

    app.use("/api/auth", auth.router);
    app.use("/api/projects", projects);

};