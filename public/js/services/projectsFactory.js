(function () {
    'use strict';

    angular
        .module('app')
        .factory('projectsFactory', projectsFactory);

    projectsFactory.$inject = ['$http, toastr, config'];

    /* @ngInject */
    function projectsFactory($http, toastr, config) {
        var service = {};

        return service;

        ////////////////

    }
})();