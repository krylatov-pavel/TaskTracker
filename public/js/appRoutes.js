(function(){
    'use strict';

    angular.module('app')
        .config(function($stateProvider){
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
                    controller: 'projectListController as projects'
                })

        });
})();
