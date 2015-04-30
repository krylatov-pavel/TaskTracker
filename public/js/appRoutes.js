(function(){
    'use strict';

    angular.module('app')
        .config(function($stateProvider){
            $stateProvider
                .state('signIn', {
                    url: '/signin',
                    templateUrl: '../templates/signIn.html'
                })

        });
})();
