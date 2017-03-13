/**
 * Created by lkc-dev on 3/6/17.
 */



(function() {
    'use strict';
    angular.module('fhscModule').run(function($rootScope, $state, authSvc, AUTH_EVENTS) {

        console.log("fhscModule.run is called");

        // before each state change, check if the user is logged in
        // and authorized to move onto the next state
        $rootScope.$on('$stateChangeStart', function(event, next) {
            console.log("$rootScope.$on $stateChangeStart is called");
            var authorizedRoles = next.data.authorizedRoles;
            var authenticationRequired = next.data.authenticate;

            /**
             * The logic of bringing the session from local storage is in
             * authSvc.isAuthenticated(). This method should be called
             */
            authSvc.isAuthenticated();

            if (authenticationRequired)
                if (!authSvc.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (authSvc.isAuthenticated()) {
                        console.log("AUTH_EVENTS.notAuthorized");
                        // user is not allowed
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                        console.log("AUTH_EVENTS.notAuthenticated");
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
        });

        /* To show current active state on menu */
        $rootScope.getClass = function(path) {
            if ($state.current.name == path) {
                return "active";
            } else {
                return "";
            }
        }

        $rootScope.logout = function() {
            console.log("logout button clicked");
            authSvc.logout();
        };

    });

})();