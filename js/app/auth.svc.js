/**
 * Created by lkc-dev on 3/6/17.
 */

(function() {
    'use strict';

    angular.module('fhscModule').service('authSvc', function($rootScope, $http, sessionSvc, $window, AUTH_EVENTS, $localStorage) {

        // check if the user is authenticated
        this.isAuthenticated = function() {

            if ($localStorage.currentUser) {
                var data = $localStorage.currentUser;
                console.log("currentUser exists " + data.user + "  " + data.userRole + "  " + data.token);

                sessionSvc.create({
                    user : data.user,
                    userRole : data.userRole
                });

                if (!$rootScope.currentUser) {
                    console.log("creating $rootScope.currentUser ");
                    $rootScope.currentUser = {
                        user : data.user,
                        userRole : data.userRole
                    };
                }
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
            return !!sessionSvc.user;
        };

        // check if the user is authorized to access the next route
        // this function can be also used on element level
        // e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to
        // admins</p>
        this.isAuthorized = function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [ authorizedRoles ];
            }
            return (this.isAuthenticated() && authorizedRoles.indexOf(sessionSvc.userRole) !== -1);
        };

        // return this;

    });

})();
