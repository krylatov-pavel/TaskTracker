module.exports = function(mongoose){
    var Project = require("../models/project");
    var Q = require("q");

    return {
        create: create,
        read: read,
        readAll: readAll,
        update: update,
        remove: remove
    };

    function readAll(){

    }

    function read(id){

    }

    function create(name){
        var deferred = Q.defer();
        var project = new Project();

        project.name = name;

        project.save(function(err) {
            if (err) {
                deferred.reject(new Error(err));
                return;
            }
            deferred.resolve(project);
        });

        return deferred.promise;
    }

    function update(id){

    }

    function remove(id){

    }
};