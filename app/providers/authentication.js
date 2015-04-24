module.exports = function(mongoose){
    var passport = require("passport");
    var LocalStrategy = require("passport-local");
    var userSvc = require("../services/usersSvc")(mongoose);

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

    return passport;
}