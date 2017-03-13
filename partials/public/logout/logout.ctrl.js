/**
 * Created by lkc-dev on 12/3/16.
 */

(function() {
    'use strict';

    angular.module('cephas.logoutModule').controller('logoutCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'logoutSvc', 'AUTH_EVENTS', logoutController]);

    function logoutController($scope, $rootScope, $uibModalInstance, logoutSvc, AUTH_EVENTS) {

        $scope.logoutForm = {};
        $scope.error = false;

        $scope.logoutSvc = logoutSvc;

        $scope.submit = function() {
            $scope.submitted = true;

            var result = logoutSvc.logoutCall(function(result) {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                $uibModalInstance.close();
            }, function(result) {

            });
        }

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }
    }

})();
