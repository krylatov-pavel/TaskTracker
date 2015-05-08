angular.module('app', [
    'ui.router',
    'ngAnimate',
    'toastr'
]).config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right'
    })
});
