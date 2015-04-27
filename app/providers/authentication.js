module.exports = function(mongoose) {
    var passport = require("passport");
    var LocalStrategy = require("passport-local");
    var RememberMeStrategy = require("passport-remember-me").Strategy;
    var User = mongoose.model("User");
    var Token = mongoose.model("Token");

    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOneQ({email: username})
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
        User.findByIdQ(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                done(err, null);
            });
    });

    passport.use(new RememberMeStrategy(
        function verifyToken(token, done) {
            Token.consume(token)
                .then(function (uid) {
                    if (!uid) {
                        return done(null, false);
                    }
                    return User.findByIdQ(uid);
                })
                .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
                .catch(function (err) {
                    done(err);
                });
        },
        function issueToken(user, done) {
            Token.issue(user.id)
                .then(function (token) {
                    done(null, token.key);
                })
                .catch(function (err) {
                    done(err);
                });
        }
    ));

    return passport;
};