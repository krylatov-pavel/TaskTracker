module.exports = function(mongoose) {
    var Project = require("../models/project")(mongoose);

    return {
        create: create,
        read: read,
        readAll: readAll,
        update: update,
        remove: remove
    };

    function readAll() {
        return Project.findQ();
    }

    function read(id) {
        return Project.findByIdQ(id);
    }

    function create(name) {
        var project = new Project();

        project.name = name;
        return project.saveQ();
    }

    function update(id, newProject) {
        var deferred = Q.defer;

        read(id)
            .then(function (oldProject) {
                oldProject.name = newProject.name;
                Project.save(function (err) {
                    if (err) {
                        deferred.reject(new Error(err));
                        return;
                    }
                    deferred.resolve();
                });
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }

    function remove(id){
        var deferred = Q.defer;

        read(id)
            .then(function (project) {
                oldProject.name = newProject.name;
                Project.save(function (err) {
                    if (err) {
                        deferred.reject(new Error(err));
                        return;
                    }
                    deferred.resolve();
                });
            })
            .catch(function (err) {
                deferred.reject(err);
            })

        return deferred.promise;
    }
};