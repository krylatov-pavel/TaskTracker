module.exports = function(app, mongoose) {
    var express = require("express");
    var projectsCtrl = require("./controllers/projectsCtrl")(mongoose);
    var usersCtrl = require("./controllers/usersCtrl")(mongoose);
    var authCtrl = require("./controllers/authCtrl")(mongoose);
    var ticketsCtrl = require("./controllers/ticketsCtrl")(mongoose);
    var passport = require("./providers/authentication")(mongoose);
    var user = require("./providers/roles");

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate("remember-me"));
    app.use(user.middleware());

    app.post("/api/signIn", passport.authenticate('local'), authCtrl.rememberMe, authCtrl.signIn);
    app.post("/api/signOut", user.can("authenticated"), authCtrl.signOut);
    app.use("/api/projects", user.can("authenticated"), projectsCtrl);
    app.use("/api/tickets", user.can("authenticated"), ticketsCtrl);
    app.use("/api/users", usersCtrl);
};