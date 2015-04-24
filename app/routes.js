module.exports = function(app, mongoose) {
    var express = require("express");
    var projectsCtrl = require("./controllers/projectsCtrl")(mongoose);
    var usersCtrl = require("./controllers/usersCtrl")(mongoose);
    var passport = require("./providers/authentication")(mongoose);
    var user = require("./providers/roles");

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(user.middleware());

    app.post("/api/signIn", passport.authenticate('local'), usersCtrl.signIn);
    app.post("/api/signUp", usersCtrl.signUp);
    app.use("/api/projects", user.can("authenticated"), projectsCtrl);
};