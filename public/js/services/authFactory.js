(function () {
    'use strict';

    angular
        .module('app')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', 'toastr', 'config'];

    /* @ngInject */
    function authFactory($http, toastr, config) {
        var auth = {
            signIn: signIn
        };

        return auth;

        ////////////////

        function signIn(signInModel) {
            return $http.post(config.auth.signIn, signInModel)
                .then(function(response){
                    toastr.success("You have successfully signed in.");
                    return response;
                })
                .catch(function(err){
                   throw err;
                });
        }
    }
})();