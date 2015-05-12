angular.module('app').factory('ticketService', ticketService);

function ticketService($http, lodash, config){
    var list = [];

    var service = {
        getAll: getAll,
        add: add,
        update: update,
        remove: remove
    };

    return service;

    function getAll(projectId){
        return $http.get(config.services.tickets + '/' + projectId)
            .then(function(response){
                list.length = 0;
                list.push.apply(list, response.data);
                return list;
            })
            .catch(function(err){
                throw err;
            })
    }

    function add(ticket){
        return $http.post(config.services.tickets + '/' + ticket.project, ticket)
            .then(function(response){
                list.push(response.data);
                return response.data;
            })
            .catch(function(err){
                throw err;
            })
    }

    function update(ticket){
        return $http.put(config.services.tickets + '/' + ticket.project + '/' + ticket._id, ticket)
            .then(function(response){
                angular.extend(lodash.find(list, function(item){
                    return item._id === ticket._id;
                }), ticket);
                return response.data;
            })
            .catch(function(err){
                throw err;
            })
    }

    function remove(ticket){
        return $http.delete(config.services.tickets + '/' + ticket.project + '/' + ticket._id, ticket)
            .then(function(response){
                lodash.remove(list, function(item){
                  return item._id === ticket._id;
                });
                return response.data;
            })
            .catch(function(err){
                throw err;
            })
    }
}