angular.module('app').controller('projectViewController', projectViewController);

function projectViewController($state, $stateParams, project, tickets, projectsService){
    var vm = this;

    vm.data = project;
    vm.data.tickets = tickets;
    vm.addTicket = addTicket;

    function addTicket() {
        $state.go('main.addTicket', {projectId: $stateParams.projectId});
    }
}