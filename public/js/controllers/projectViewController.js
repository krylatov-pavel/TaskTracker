angular.module('app').controller('projectViewController', projectViewController);

function projectViewController($state, $stateParams, project, tickets, ticketService){
    var vm = this;

    vm.data = project;
    vm.data.tickets = tickets;
    vm.addTicket = addTicket;
    vm.moveTicket = moveTicket;

    function addTicket() {
        $state.go('main.addTicket', {projectId: $stateParams.projectId});
    }

    function moveTicket(ticket, status){
        if (ticket.status !== status) {
            ticket.status = status;
            ticketService.update(ticket);
        }
    }
}