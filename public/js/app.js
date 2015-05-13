angular.module('app', [
    'ui.router',
    'ngAnimate',
    'toastr',
    'ngLodash',
    'dndLists'
]).config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        positionClass: 'toast-bottom-right'
    })
});
