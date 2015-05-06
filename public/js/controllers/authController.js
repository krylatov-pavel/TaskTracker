(function () {
    'use strict';

    angular
        .module('app')
        .controller('authController', authController);

    authController.$inject = ['userService'];

    /* @ngInject */
    function authController(userService)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.signIn = signIn;
        vm.signUp = signUp;

        ////////////////

        function signIn(model) {
            return userService.signIn(model);
        }

        function signUp(model) {
            return userService.signUp(model);
        }
    }
})();