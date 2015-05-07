(function() {
    'use strict';

    angular.module('app')
        .config(function ($stateProvider) {
            $stateProvider
                .state('signIn', {
                    url: '/signin',
                    templateUrl: '../templates/signIn.html',
                    public: true
                })
                .state('signUp', {
                    url: '/signup',
                    templateUrl: '../templates/signUp.html',
                    public: true
                })
                .state('projects', {
                    url: '/projects',
                    templateUrl: '../templates/project-list.html',
                    controller: 'projectListController',
                    controllerAs: 'projects'
                })

        })
        .run(function ($rootScope, $state, authService, toastr) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                authService.state()
                    .then(function(user){
                        if (!user.isAuthenticated){
                            if (!toState.public) {
                                if (toState.name !== 'signIn') {
                                    event.preventDefault();
                                    toastr.warning("You're are not logged in");
                                    $state.go('signIn');
                                }
                            }
                        }
                    });
            });
        }
    );


    //TO DO: add public and private routes
    //TO DO: hide login and register links if user authenticated;
    //TO DO: logout user on 401 error
})();
