(function () {
    'use strict';

    angular
        .module('app')
        .factory('projectsFactory', projectsFactory);

    projectsFactory.$inject = ['$http', 'toastr', 'config'];

    /* @ngInject */
    function projectsFactory($http, toastr, config) {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http.get(config.services.projects)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (err) {
                    throw err;
                });
        }
    }
})();