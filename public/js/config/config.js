(function(){
    'use strict';

    angular.module('app').constant('config', (function(){
        var baseUrl = window.location.origin + '/api';

        return {
            services: {
                auth: {
                    signIn: baseUrl + '/signIn',
                    signUp: baseUrl + '/users',
                    signOut: baseUrl + '/signOut',
                    isAuthenticated: baseUrl + '/isAuthenticated'
                },
                projects: baseUrl + '/projects'
            }
        };
    })());
})();