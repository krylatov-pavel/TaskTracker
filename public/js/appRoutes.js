(function() {
    'use strict';

    angular.module('app')
        .config(routeConfig)
        .run(authConfig);


    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('signIn', {
                url: '/signin',
                templateUrl: '../templates/signIn.html'
            })
            .state('signUp', {
                url: '/signup',
                templateUrl: '../templates/signUp.html'
            })
            .state('projects', {
                url: '/projects',
                templateUrl: '../templates/project-list.html',
                controller: 'projectListController',
                controllerAs: 'projects'
            })

    }

    authConfig.$inject = ['$rootScope', '$state', 'authService'];

    function authConfig($rootScope, $state, authService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (!authService.user.isAuthenticated) {
                if (toState.name !== 'signIn'){
                    event.preventDefault();
                    $state.go('signIn');
                }
            }
        });
    }
})();
