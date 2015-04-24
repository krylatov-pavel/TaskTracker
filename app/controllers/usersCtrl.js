module.exports = function(mongoose) {
    var userSvc = require("../services/usersSvc")(mongoose);

    return {
        signUp: signUp,
        signIn: signIn
    };

    function signUp(req, res, next) {
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
    }

    function signIn(req, res) {
        res.status(200).end();
    };
};