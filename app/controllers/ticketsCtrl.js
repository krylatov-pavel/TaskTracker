module.exports = function(mongoose) {
    var Ticket = mongoose.model("Ticket");
    var cleanObj = require("clean-obj");
    var router = require("express").Router();

    router.route("/:projectId")
        .get(function (req, res, next) {
            Ticket.find({project: req.params.projectId})
                .populate("assignee")
                .execQ()
                .then(function (tickets) {
                    res.json(tickets);
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .post(function (req, res, next) {
            var ticket = new Ticket({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                priority: req.body.priority,
                assignee: req.body.assignee,
                project: req.params.projectId
            });

            ticket.saveQ()
                .then(function () {
                    res.json(ticket);
                })
                .catch(function (err) {
                    next(err);
                });
        });

    router.route("/:projectId/:id")
        .get(function (req, res, next) {
            res.status(503).end();
        })
        .put(function (req, res, next) {
            var ticket = cleanObj({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                priority: req.body.priority,
                assignee: req.body.assignee
            });

            Ticket.updateQ(req.params.id, {$set: ticket})
                .then(function () {
                    res.status(200).end();
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .delete(function (req, res, next) {
            Ticket.removeQ(req.params.id)
                .then(function () {
                    res.status(200).end();
                })
                .catch(function (err) {
                    next(err);
                });
        });

    return router;
};

//TO DO: use drag and drop to change ticket statuses;
//TO DO: use gulp to minify and concat;