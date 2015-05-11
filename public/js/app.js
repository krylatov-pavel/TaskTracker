angular.module('app', [
    'ui.router',
    'ngAnimate',
    'toastr',
    'ngLodash'
]).config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right'
    })
});
