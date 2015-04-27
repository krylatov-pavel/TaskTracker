module.exports = function(mongoose) {
    var express = require("express");
    var Project = mongoose.model("Project");
    var router = express.Router();

    router.route("/")
        .get(function(req, res, next) {
            Project.findQ()
                .then(function (projects) {
                    res.json(projects);
                })
                .catch(function (err) {
                    next(err);
                });
        })
        .post(function(req, res, next) {
            Project.create(req.body.name, req.user.id)
                .then(function (project) {
                    res.json(project);
                })
                .catch(function (err) {
                    next(err);
                });
        });

    router.route("/:id")
        .get(function(req, res, next){
            Project.findByIdQ(req.params.id)
                .then(function(project){
                    res.json(project);
                })
                .catch(function(err){
                    next(err);
                });
        })
        .put(function(req, res, next){
            res.status(503).end();
        })
        .delete(function(req, res, next){
            Project.findByIdAndRemoveQ(req.params.id)
                .then(function(){
                    res.status(200).end();
                })
                .catch(function(err){
                    next(err);
                });
        });

    return router;
};

