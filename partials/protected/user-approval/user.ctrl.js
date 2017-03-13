/**
 * Created by lkc-dev on 3/7/17.
 */

(function() {
    'use strict';

    angular.module('cephas.userApprovalModule').controller('userCtrl', ['$scope', '$uibModalInstance', 'user', userController]);

    function userController($scope, $uibModalInstance, user) {

        $scope.user=user;
        console.log("From userCtrl: " + JSON.stringify(user));

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }
    }

})();