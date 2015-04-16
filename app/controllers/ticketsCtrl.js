var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req, res, next){
        res.send("get all tickets");
    })
    .post(function(req, res, next){
        res.send("add");
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

module.exports = router;