/**
 * Created by lkc-dev on 3/3/17.
 */

(function() {
    'use strict';

    angular.module('cephas.fileUploadModule').controller('fileUploadCtrl', ['$scope', '$rootScope','$uibModalInstance', 'fileUploadSvc', 'FILE_UPLOAD_EVENTS', fileUploadController]);

    function fileUploadController($scope, $rootScope, $uibModalInstance,fileUploadSvc, FILE_UPLOAD_EVENTS) {
        console.log("fileUploadCtrl is called :    &&&&&");

        /**
             *
             * @type {fileUploadController}
             * Without var self = this;
             * this in the html will not work
             * ng-table="vm.tableParams"
             */
            var self = this;
            //setting possible values
            $scope.fileTypes=['DATA','DOC','DATA_PRIVATE','DOC_PRIVATE','DATA_PUSH','DOC_PUSH','DATA_PUBLIC','DOC_PUBLIC'];

            //populating defualt values
            $scope.file={"type":"DATA_PRIVATE"};

            $scope.fileUploadSvc = fileUploadSvc;

            $scope.close = function(){
                console.log(" ****************************    Close Button Pressed");
                $uibModalInstance.close();
            }

            /*
             //Added directive for file upload in APP.js. Simulate a ng-Change
             */
            $scope.updateFile= function(event){
                if(event.target.files.length>0) {
                    $scope.file.name = event.target.files[0].name;
                    $scope.file.content=event.target.files[0];
                    $scope.$apply();
                }
            }

            $scope.submit=function(){
                $scope.error=false;
                $scope.fileUploadSvc.uploadFile($scope.file,function(response){
                    $uibModalInstance.close();
                    $rootScope.$broadcast(FILE_UPLOAD_EVENTS.fileUploadSuccess);
                    console.log("UPLOAD success");
                },function(error){
                    $scope.error=true;
                    $scope.errorMessage=error.data;
                    console.log("UPLOAD failure");
                });
            }
    }

})();