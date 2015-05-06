module.exports = function(mongoose) {
    var Project = mongoose.model("Project");
    var router = require("express").Router();
    var cleanObj = require("clean-obj");

    router.route("/")
        .get(function(req, res, next) {
            Project.findQ({user: req.user.id})
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
            var project = cleanObj({
                name: req.body.name,
                user: req.body.user,
                statuses: req.body.statuses,
                priorities: req.body.priorities
            });

            Project.updateQ({ _id: req.params.id}, { $set: project })
                .then(function(){
                    res.status(200).end();
                })
                .catch(function(err){
                    next(err);
                });
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

