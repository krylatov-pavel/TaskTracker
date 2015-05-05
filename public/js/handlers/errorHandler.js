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
            var msg = formatErrorMsg(exception);
            toastr.error(msg.message, msg.title);
            $delegate(exception, cause);
        }
    }

    function formatErrorMsg(err){
        var msg = {};

        switch (err.status){
            case 401:
                msg.title = 'unauthorized';
                msg.message = 'please sign in';
                break;
            case 403:
                msg.title = 'forbidden';
                msg.message = 'you have no permission to access this resource';
                break
            default:
                msg.title = 'error';
                msg.message = err.message || err.data.message;
        }

        return msg;
    }
})();
