(function() {
    'use strict';

    angular.module('cephas.fileDetailsModule').controller('fileDetailsCtrl', ['$scope', '$uibModalInstance', 'fileDetails', fileDetailsController]);

    function fileDetailsController($scope, $uibModalInstance, fileDetails) {

        $scope.fileDetails=fileDetails;

        console.log("From fileDetailsCtrl: " + JSON.stringify($scope.fileDetails));

        $scope.close = function() {
            console.log(" ****************************    Close Button Pressed");
            $uibModalInstance.close();
        }
    }

})();