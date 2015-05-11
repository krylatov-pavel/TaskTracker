angular
    .module('app')
    .factory('projectsService', projectsService);

function projectsService($http, toastr, config, lodash) {
    var list = [];

    var service = {
        get : get,
        getAll: getAll,
        add: add,
        remove: remove,
        update: update
    };

    return service;

    function get(id) {
        return $http.get(config.services.projects + '/' + id)
            .then(function (response) {
                return response.data;
            })
            .catch(function (err) {
                throw err;
            });
    }

    function getAll() {
        return $http.get(config.services.projects)
            .then(function (response) {
                list.length = 0;
                list.push.apply( list, response.data );
                return list;
            })
            .catch(function (err) {
                throw err;
            });
    }

    function add(name){
        return $http.post(config.services.projects, {name: name})
            .then(function(response){
                list.push(response.data);
                return response.data;
            })
            .catch(function(err){
                throw err;
            });
    }

    function remove(project){
        return $http.delete(config.services.projects + '/' + project._id)
            .then(function(response) {
                lodash.remove(list, function (item) {
                    return item._id == project._id;
                });
                return response.data;
            })
            .catch(function(err){
               throw err;
            });
    }

    function update(project){
        return $http.put(config.services.projects + '/' + project._id, project)
            .then(function(response){
                angular.extend(lodash.find(list, function(item){
                    return item._id === project._id;
                }), project);
                return response.data;
            })
            .catch(function(err){
                throw err;
            });
    }
}
