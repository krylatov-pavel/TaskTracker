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

        vm.signInModel = {};
        vm.signIn = signIn;
        vm.test = 'test';

        ////////////////

        function signIn(model) {
            return authFactory.signIn(model);
        }
    }
})();