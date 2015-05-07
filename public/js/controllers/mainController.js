angular.module('app').controller('mainController', mainController);

function mainController(user, userService){
    var vm = this;

    vm.user = user;
    vm.signOut = signOut;

    function signOut(){
        userService.signOut();
    }
}