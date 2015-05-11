angular.module('app').controller('projectEditController', projectEditController);

function projectEditController($state, $stateParams, toastr, lodash, projectsService){
    /* jshint validthis: true */
    var vm = this;
    vm.data = null;
    vm.addStatus = addStatus;
    vm.addPriority = addPriority;
    vm.removeStatus = removeStatus;
    vm.removePriority = removePriority;
    vm.open = open;
    vm.remove = remove;
    vm.save = save;

    activate();

    function activate (){
        projectsService.get($stateParams.projectId)
            .then(function(project){
                vm.data = project;
            });
    }

    function addStatus(status){
        if (vm.data.statuses.indexOf(status) > -1) {
            return toastr.warning("this status already exist");
        }
        vm.data.statuses.push(status);
    }

    function addPriority(priority){
        if (vm.data.priorities.indexOf(priority) > -1){
            return toastr.warning("this priority already exist");
        }
        vm.data.priorities.push(priority);
    }

    function removeStatus(status){
         lodash.remove(vm.data.statuses, function(item){
             return item === status;
         });
    }

    function removePriority(priority){
        lodash.remove(vm.data.priorities, function(item){
            return item === priority;
        });
    }

    function open(project){
        $state.go('main.project', {projectId : project._id});
    }

    function remove(project){
        if (confirm('Are you sure?')){
            projectsService.remove(project)
                .then(function(){
                    toastr.success('project deleted');
                    $state.go('main.projects');
                });
        }
    }

    function save(project){
        projectsService.update(project)
            .then(function(){
               toastr.success('project saved');
            });
    }
}