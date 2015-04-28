module.exports = function(mongoose) {
    var User = mongoose.model("User");
    var router = require("express").Router();
    var user = require("../providers/roles");

    router.route("/")
        .get(user.can("authenticated"), function (req, res, next) {
            User.findQ()
                .then(function (users) {
                    res.json(users);
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .post(function (req, res, next) {
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
        });

    router.route("/:id")
        .get(user.can("authenticated"), function (req, res, next) {
            User.findById(req.params.is)
                .populate("projects")
                .execQ()
                .then(function (user) {
                    res.json(user);
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .put(user.can("authenticated"), function (req, res, next) {
            res.status(503).end();
        })
        .delete(user.can("authenticated"), function (req, res, next) {
            User.removeQ(req.params.id)
                .then(function () {
                    res.status(200).end();
                })
                .catch(function (err) {
                    next(err);
                });
        });

    return router;
};