angular
    .module('app')
    .controller('projectListController', projectListController);

function projectListController(projects, projectsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.list = projects;
    vm.add = add;

    function add(name) {
        projectsService.add(name);
    }
}

