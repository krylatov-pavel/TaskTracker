angular.module('app').filter('priorityClass', priorityClassFilter);

function priorityClassFilter(){
    return function(priority){
        switch (priority){
            case 'minor':
                return 'panel-success';
            case  'major':
                return 'panel-warning';
            case 'critical':
                return 'panel-danger';
            default:
                return 'panel-info';
        }
    }
}