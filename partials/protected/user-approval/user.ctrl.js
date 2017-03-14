/**
 * Created by lkc-dev on 3/7/17.
 */

(function() {
    'use strict';

    angular.module('cephas.userApprovalModule').controller('userCtrl', ['$scope', '$uibModalInstance', 'user', 'userSvc', userController]);

    function userController($scope, $uibModalInstance, user, userSvc) {

        $scope.actions = ['Approve', 'Reject'];
        $scope.adminDecision = {};

        $scope.userSvc = userSvc;

        $scope.user=user;
        console.log("From userCtrl: " + JSON.stringify(user));

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }

        $scope.submit = function() {

            console.log(user.userId);
            console.log($scope.adminDecision.approval);
            console.log($scope.adminDecision.adminComment);

            userSvc.approvalCall(user.userId, $scope.adminDecision.approval, $scope.adminDecision.adminComment,
                function(result) {}, function(result) {});
        }
    }

})();