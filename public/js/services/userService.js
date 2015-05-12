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
            signOut: signOut,
            getAll: getAll
        };

        return user;

        ////////////////

        function signIn(signInModel) {
            return $http.post(config.services.auth.signIn, signInModel)
                .then(function (response) {
                    toastr.success("You have successfully signed in.");
                    auth.state(response.data);
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
                    auth.state({
                        name: '',
                        isAuthenticated: false
                    });
                    return response;
                })
                .catch(function (err) {
                    throw err;
                });
        }

        function getAll(){
            return $http.get(config.services.users)
                .then(function (response){
                    return response.data;
                })
                .catch(function(err){
                    throw err;
                });
        }
    }
})();