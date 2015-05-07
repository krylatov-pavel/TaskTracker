(function() {
    'use strict';

    angular.module('app')
        .config(function ($stateProvider) {
            var baseUrl = '../templates';

            $stateProvider
                .state('main', {
                    url: '',
                    templateUrl: baseUrl + '/layout.html',
                    controller: 'mainController',
                    controllerAs : 'main',
                    public: true,
                    resolve: {
                        user: function(authService) {
                            return authService.state();
                        }
                    }
                })
                .state('main.signIn', {
                    url: '/signin',
                    templateUrl: baseUrl + '/signIn.html',
                    public: true
                })
                .state('main.signUp', {
                    url: '/signup',
                    templateUrl: baseUrl + '/signUp.html',
                    public: true
                })
                .state('main.projects', {
                    url: '/projects',
                    templateUrl: baseUrl + '/project-list.html',
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
                                if (toState.name !== 'main.signIn') {
                                    event.preventDefault();
                                    toastr.warning("You're are not logged in");
                                    $state.go('main.signIn');
                                }
                            }
                        }
                    });
            });
        }
    );
    //TO DO: hide login and register links if user authenticated;
    //TO DO: logout user on 401 error
})();
