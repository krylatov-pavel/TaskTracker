module.exports = function(mongoose) {
    var express = require("express");
    var projectSvc = require("../services/projectsSvc")(mongoose);
    var router = express.Router();

    router.route("/")
        .get(function(req, res, next){
            res.send("get all");
        })
        .post(function(req, res, next){
            projectSvc.create(req.body.name)
                .then(function(project){
                    res.json(project);
                }, function(err){
                   next(err);
                });
        });

    router.route("/:id")
        .get(function(req, res, next){
            res.send("get by id");
        })
        .put(function(req, res, next){
            res.send("update");
        })
        .delete(function(req, res, next){
            res.send("delete");
        });

    return router;
};

