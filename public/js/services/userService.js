(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', 'toastr', 'config', 'authService'];

    /* @ngInject */
    function userService($http, toastr, config, auth) {
        var user = {
            signIn: signIn,
            signUp: signUp,
            signOut: signOut
        };

        return user;

        ////////////////

        function signIn(signInModel) {
            return $http.post(config.services.auth.signIn, signInModel)
                .then(function (response) {
                    toastr.success("You have successfully signed in.");
                    auth.user = response.data;
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
                    return signIn(signUpModel);
                })
                .catch(function (err) {
                    throw err;
                });
        }

        function signOut() {
            return $http.post(config.services.auth.signOut)
                .then(function (response) {
                    toastr.success("Sign out");
                    auth.user.name = '';
                    auth.user.isAuthenticated = false;
                    return response;
                })
                .catch(function (err) {
                    throw err;
                });
        }
    }
})();