angular.module('app').controller('mainController', mainController);

function mainController(user, userService){
    var vm = this;

    vm.user = user;
    vm.signOut = signOut;
    vm.check = check;

    function check(){
        console.log(vm.user);
    }

    function signOut(){
        userService.signOut();
    }
}