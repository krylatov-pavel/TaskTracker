(function () {
    'use strict';

    angular
        .module('app')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', 'toastr', 'config'];

    /* @ngInject */
    function authFactory($http, toastr, config) {
        var auth = {
            signIn: signIn,
            signUp: signUp,
            signOut: signOut
        };

        return auth;

        ////////////////

        function signIn(signInModel) {
            return $http.post(config.services.auth.signIn, signInModel)
                .then(function (response) {
                    toastr.success("You have successfully signed in.");
                    return response;
                })
                .catch(function (err) {
                    if (err.status === 401) {
                        toastr.error("Incorrect email or password");
                        return;
                    }
                    throw err;
                });
        }

        function signUp(signUpModel) {
            return $http.post(config.services.auth.signUp, signUpModel)
                .then(function (response) {
                    toastr.success("You have successfully registered.");
                    return response;
                })
                .catch(function (err) {
                    throw err;
                });
        }

        function signOut() {
            return $http.post(config.services.auth.signOut)
                .then(function (response) {
                    toastr.success("Sign out");
                    return response;
                })
                .catch(function (err) {
                    throw err;
                });
        }
    }
})();