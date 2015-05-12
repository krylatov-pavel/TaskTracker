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
                    controllerAs: 'main',
                    public: true,
                    resolve: {
                        user: function (authService) {
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
                    controllerAs: 'projects',
                    resolve: {
                        projects: function (projectsService) {
                            return projectsService.getAll()
                        }
                    }
                })
                .state('main.projects.edit', {
                    url: '/edit/:projectId',
                    templateUrl: baseUrl + '/project-edit.html',
                    controller: 'projectEditController',
                    controllerAs: 'project'
                })
                .state('main.project',{
                    url: '/projects/:projectId',
                    templateUrl: baseUrl + '/project-view.html',
                    controller: 'projectViewController',
                    controllerAs: 'project',
                    resolve: {
                        project: function($stateParams, projectsService){
                            return projectsService.get($stateParams.projectId);
                        },
                        tickets: function($stateParams, ticketService){
                            return ticketService.getAll($stateParams.projectId);
                        }
                    }
                })
                .state('main.addTicket', {
                    url: '/projects/:projectId/addTicket',
                    templateUrl: baseUrl + '/project-add-ticket.html',
                    controller: 'addTicketController',
                    controllerAs: 'ticket',
                    resolve: {
                        project: function($stateParams, projectsService) {
                            return projectsService.get($stateParams.projectId);
                        },
                        users: function(userService){
                            return userService.getAll();
                        }
                    }
                });
        })
        .run(function ($rootScope, $state, authService, toastr) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                authService.state()
                    .then(function(user) {
                        if (!(user.isAuthenticated || toState.public)) {
                            if (toState.name !== 'main.signIn') {
                                event.preventDefault();
                                toastr.warning("You're are not logged in");
                                $state.go('main.signIn');
                            }
                        }
                    });
            });
        }
    );
})();
