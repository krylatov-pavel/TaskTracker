module.exports = function(mongoose) {
    var express = require("express");
    var userSvc = require("../services/usersSvc")(mongoose);
    var passport = require("passport");
    var LocalStrategy = require("passport-local");
    var router = new express.Router();

    passport.use(new LocalStrategy(
        function (username, password, done) {
            userSvc.readByEmail(username)
                .then(function (user) {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    if (!user.isValidPassword(password)) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user);
                })
                .catch(function (err) {
                    done(err);
                });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userSvc.readById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            });
    });

    router.route("/signUp")
        .post(function(req, res, next) {
            if (req.body.password !== req.body.confirmPassword) {
                return next(new Error("Password and Confirm Password fields not match"));
            }
            userSvc.create(req.body.email, req.body.password, req.body.firstName, req.body.lastName)
                .then(function (user) {
                    res.json(user);
                })
                .catch(function (err) {
                    next(err);
                });
        });

    router.route("/signIn")
        .post(passport.authenticate('local'), function(req, res){
            res.status(200).end();
        });

    return {
        passport: passport,
        router: router
    };
};