module.exports = function(mongoose) {
    var User = mongoose.model("User");
    var Token = mongoose.model("Token");

    return {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        rememberMe: rememberMe
    };

    function signUp(req, res, next) {
        if (req.body.password !== req.body.confirmPassword) {
            return next(new Error("Password and Confirm Password fields not match"));
        }
        User.create(req.body.email, req.body.password, req.body.firstName, req.body.lastName)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
                next(err);
            });
    }

    function signIn(req, res) {
        res.status(200).end();
    }

    function signOut(req, res){
        res.clearCookie('remember_me');
        req.logout();
        res.status(200).end();
    }

    function rememberMe(req, res, next) {
        if (!req.body.rememberMe) {
            return next();
        }

        Token.issue(req.user.id)
            .then(function (token) {
                res.cookie('remember_me', token.key, {path: '/', httpOnly: true, maxAge: 604800000});
                next();
            })
            .catch(function (err) {
                next(err);
            });
    }
};