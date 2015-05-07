(function () {
    'use strict';

    angular
        .module('app')
        .controller('authController', authController);

    /* @ngInject */
    function authController($state, userService)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.signIn = signIn;
        vm.signUp = signUp;

        ////////////////

        function signIn(model) {
            userService.signIn(model)
                .then(function(){
                   $state.go('main');
                });
        }

        function signUp(model) {
            return userService.signUp(model);
        }
    }
})();