/**
 * Created by lkc-dev on 3/7/17.
 */

(function() {
    'use strict';

    angular.module('cephas.userApprovalModule').controller('userCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'user', 'userSvc', 'AUTH_EVENTS', userController]);

    function userController($scope, $rootScope, $uibModalInstance, user, userSvc, AUTH_EVENTS) {

        console.log("From userCtrl: " + JSON.stringify(user));

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }
    }

})();