(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectListController', projectListController);

    projectListController.$inject = ['projectsFactory'];

    /* @ngInject */
    function projectListController(projectsFactory) {
        /* jshint validthis: true */
        var vm = this;
        vm.list = [];

        activate();

        function activate() {
            projectsFactory.getAll()
                .then(function (data) {
                    vm.list = data;
                });
        }
    }
})();