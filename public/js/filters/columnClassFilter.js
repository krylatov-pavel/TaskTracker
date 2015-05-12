angular.module('app').filter('columnClass', columnClassFilter);

function columnClassFilter(){
    return function(number, prefix) {
        return ['col-', prefix, '-', Math.floor(12 / number)].join('');
    }
}