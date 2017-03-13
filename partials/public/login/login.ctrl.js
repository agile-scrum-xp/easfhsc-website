/**
 * Created by lkc-dev on 12/3/16.
 */

(function() {
    'use strict';

    angular.module('cephas.loginModule').controller('loginCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'loginSvc', 'AUTH_EVENTS', loginController]);

    function loginController($scope, $rootScope, $uibModalInstance, loginSvc, AUTH_EVENTS) {

        $scope.credentials = {};
        $scope.loginForm = {};
        $scope.error = false;

        $scope.loginSvc = loginSvc;

        $scope.submit = function() {
            $scope.submitted = true;
            if (!$scope.loginForm.$invalid) {
                var result = loginSvc.loginCall($scope.credentials.username, $scope.credentials.password, function(result) {
                    // success function
                    console.log("The result in the calling controler: " + result);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $uibModalInstance.close();
                }, function(result) {
                    /*
                     * Handle the Error here
                     */
                    $scope.error = true;
                    return;
                });
            } else {
                console.log("form is not valid");
                $scope.error = true;
                return;
            }

        }

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }
    }

})();