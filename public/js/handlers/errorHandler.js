(function(){
    'use strict';

    angular.module('app')
        .config(function($provide){
           $provide.decorator('$exceptionHandler', customErrorHandler);
        });

    customErrorHandler.$inject = ['$delegate', '$injector'];

    function customErrorHandler($delegate, $injector){
        return function(exception, cause){
            var toastr = $injector.get('toastr');
            toastr.error("Custom handler %s", exception.message);
            $delegate(exception, cause);
        }
    }
})();
