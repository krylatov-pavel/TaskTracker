angular.module('app').factory('authService', authService);

function authService($q, $http, config) {
    var currentUser = null;

    return {
        state: state
    };

    function state(user) {
        if (user) {
            return setState(user);
        }
        return getState();
    }

    function setState(user) {
        angular.extend(currentUser, user);
    }

    function getState() {
        if (currentUser) {
            var deferred = $q.defer();
            deferred.resolve(currentUser);
            return deferred.promise;
        }
        return $http.post(config.services.auth.isAuthenticated)
            .then(function (response) {
                currentUser = response.data;
                return currentUser;
            })
            .catch(function (err) {
                throw err;
            });
    }
}
