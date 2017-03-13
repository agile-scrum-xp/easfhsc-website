/**
 * Created by lkc-dev on 12/3/16.
 */


(function() {
    'use strict';

    angular.module('cephas.logoutModule').service('logoutSvc',function($localStorage, $http) {

        console.log("logoutSvc Service Called");

        this.logoutCall = function (success, error) {
            console.log("Logout in the Service Called");

            delete $localStorage.currentUser;
            //$http.defaults.headers.common.Authorization = '';

            /**
             * we don't need this as logout ctl broadcast event and
             * app ctrl responds and calls sessionSvc.destroy();
             */
            //sessionSvc.destroy();

            success(true);

        }
    });

    // function logoutService($rootScope, $scope, $http, $window, $localStorage, AUTH_EVENTS) {
    //
    //
    //
    // }

})();