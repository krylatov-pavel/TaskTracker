angular.module('app').controller('addTicketController', addTicketController);

function addTicketController($state, toastr, users, project, ticketService) {
    var vm = this;
    vm.data = {
        project: project._id
    };
    vm.users = users;
    vm.statuses = project.statuses;
    vm.priorities = project.priorities;
    vm.add = add;

    function add(ticket){
        ticketService.add(ticket)
            .then(function(ticket){
                toastr.success('Added ticket');
                $state.go('main.project', {projectId : ticket.project});
            });
    }
}