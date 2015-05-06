(function () {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = ['$http', 'config'];

    /* @ngInject */
    function authService($http, config) {
        var service = {
            user: {
                name: '',
                isAuthenticated: false
            }
        };

        initialize();

        return service;

        function initialize() {
            $http.post(config.services.auth.isAuthenticated)
                .then(function (response) {
                    service.user = response.data;
                })
                .catch(function (err) {
                    throw err;
                });
        }
    }
})
();