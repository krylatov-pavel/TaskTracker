module.exports = function(mongoose) {
    var User = mongoose.model("User");
    var Token = mongoose.model("Token");

    return {
        signIn: signIn,
        signOut: signOut,
        rememberMe: rememberMe
    };

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