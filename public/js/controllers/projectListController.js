angular
    .module('app')
    .controller('projectListController', projectListController);

function projectListController(projectsService) {
    /* jshint validthis: true */
    var vm = this;
    vm.list = [];
    vm.add = add;

    activate();

    function activate() {
        projectsService.getAll()
            .then(function (data) {
                vm.list = data;
            });
    }

    function add(name) {
        projectsService.add(name);
    }
}

