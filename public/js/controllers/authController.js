(function () {
    'use strict';

    angular
        .module('app')
        .controller('authController', authController);

    authController.$inject = ['authFactory'];

    /* @ngInject */
    function authController(authFactory)
    {
        /* jshint validthis: true */
        var vm = this;

        vm.signIn = signIn;
        vm.signUp = signUp;

        ////////////////

        function signIn(model) {
            return authFactory.signIn(model);
        }

        function signUp(model) {
            return authFactory.signUp(model);
        }
    }
})();