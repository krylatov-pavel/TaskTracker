(function () {
    'use strict';

    angular
        .module('')
        .controller('projectListController', projectListController);

    projectListController.$inject = [''];

    /* @ngInject */
    function projectListController() {
        /* jshint validthis: true */
        var vm = this;
        vm.projects = [];

        activate();

        function activate() {
        }
    }
})();