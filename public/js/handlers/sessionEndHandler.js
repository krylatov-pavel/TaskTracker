angular.module('app')
    .factory('unauthorizedResponseInterceptor', function ($q, $injector) {
        var interceptor = {
            responseError: error
        };

        return interceptor;

        function error(response) {
            if (response.status === 401) {
                var authService = $injector.get('authService');
                var $state = $injector.get('$state');
                authService.state({
                    name: '',
                    isAuthenticated: false
                });
                $state.go('main.signIn');

            }
            return $q.reject(response);
        }
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('unauthorizedResponseInterceptor');
    });
