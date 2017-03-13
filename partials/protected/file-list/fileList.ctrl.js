/**
 * Created by lkc-dev on 3/3/17.
 */

(function() {
    'use strict';

    angular.module('cephas.fileListModule').controller('fileListCtrl', ['$scope', '$rootScope', '$uibModal', '$filter',  'WEB_URLS', 'NgTableParams', 'fileListSvc','FILE_UPLOAD_EVENTS','USER_ROLES', fileListController]);


    function fileListController($scope, $rootScope, $uibModal, $filter,  WEB_URLS, NgTableParams,fileListSvc,FILE_UPLOAD_EVENTS,USER_ROLES) {

            /**
             *
             * @type {fileListController}
             * Without var self = this;
             * this in the html will not work
             * ng-table="vm.tableParams"
             */
            var self = this;

            console.log("fileListCtrl is called :    &&&&&");

            $scope.fileListSvc = fileListSvc;

            var filesListURL=WEB_URLS.singleUserFilesListURL;
            var filedetailsURL=WEB_URLS.fileDetailsInvestigatorURL;

            if($scope.currentUser.userRole==USER_ROLES.coordinator) {
                filesListURL = WEB_URLS.allUserFilesListURL;
                filedetailsURL=WEB_URLS.fileDetailsCoordinatorURL;
            }

            var updateTable=function() {
                self.tableParams = new NgTableParams({
                    page: 1, // show first page
                    count: 20 // count per page
                }, {
                    getData: function (params) {
                        console.log("getData is called :    &&&&&");
                        // ajax request to api
                        return fileListSvc.getFilesList(filesListURL).then(function (response) {
                            $scope.data = response.data;

                            var filesData = angular.copy($scope.data);

                            // First filter using the filter object provided by the
                            // method 'filter()' of ngTableParams instance.
                            var filterObject = params.filter();

                            // params may contail null values which needs to be removed
                            // e.g. params: {"site_num":null}
                            // null values are once the filter tab value is deleted in GUI
                            angular.forEach(filterObject, function (value, key) {
                                console.log("key: " + key + " value: " + value)
                                if (value === '' || value === null || value === 'null') {
                                    delete filterObject[key];
                                }
                            });

                            var filteredData = $filter('filter')($scope.data, treatJSON(filterObject));

                            //added
                            filteredData = filteredData.slice((params.page() - 1) * params.count(),
                                params.page() * params.count())

                            params.total(filteredData.length); // recal. page nav controls
                            params.settings({counts: filteredData.length > 10 ? [10, 25, 50] : []});
                            // Then we sort the data
                            // Look that the first parameter provided to $filter('orderBy') if the
                            // array we already filtered before (filteredData).

                            // sortObj in the form {"record_id":"asc"} is not working
                            // orderByObj in the form ["+record_id"] is working
                            var sortObj = params.sorting();
                            var orderByObj = params.orderBy();

                            var orderedData = $filter('orderBy')(filteredData, orderByObj);

                            $scope.data = orderedData;

                            //$scope.data = orderedData.slice(0, 3);

                            $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());

                            // Finally we rertun the orderedData NOT: original data or filtered data
                            return $scope.data;
                        }, function (response) {
                            console.log("ERROR " + response);
                        });
                    }
                });
            }

        self.goDetails = function (record_id) {
            console.log("The record id received: " + record_id);

            fileListSvc.getFileDetails(filedetailsURL, record_id, function (response) {
                    //console.log(response);

                    var modalInstance = $uibModal.open({
                        animation : $scope.animationsEnabled,
                        templateUrl : 'partials/protected/file-details/fileDetails.html',
                        controller : 'fileDetailsCtrl',
                        //
                        backdrop : 'static',
                        resolve: {
                            fileDetails: function () {
                                return response.data;
                            }
                        }
                    });
                },
                function (result) {

                });

        }

        self.goPreview = function (record_id) {
            console.log("The record id received: " + record_id);

            fileListSvc.getFile(record_id, function (response) {
                    //console.log(response);

                    var modalInstance = $uibModal.open({
                        animation : $scope.animationsEnabled,
                        templateUrl : 'partials/protected/user-approval/user.html',
                        controller : 'userCtrl',
                        //
                        backdrop : 'static',
                        resolve: {
                            user: function () {
                                return response.data;
                            }
                        }
                    });
                },
                function (result) {

                });
        }


        updateTable();
        $rootScope.$on(FILE_UPLOAD_EVENTS.fileUploadSuccess,updateTable );

    }

    //unflatten the filters for nested properties. e.g. display user as a nested object of file.
    // http://stackoverflow.com/questions/28392651/angular-js-filtering-nested-array-in-controller/34775082#34775082
    var treatJSON = function(malformedJson){

        var treatedFilters = {};

        var subObjects = [];

        var auxiliarObject;

        var objectName;
        var objectValue;

        var keys = Object.keys(malformedJson);

        for(var index = 0; index < keys.length; index++){
            auxiliarObject = null;

            subObjects = keys[index].split('.');

            // Go adding the layers from bottom to up
            for(var innerIndex = subObjects.length - 1; innerIndex >= 0 ; innerIndex--){

                // Recovery the name and the value of actual object
                objectName = subObjects[innerIndex];
                objectValue = auxiliarObject || malformedJson[keys[index]];

                // Add the objet to the treated filters or add it to the chain for the next object to use it
                if(innerIndex == 0){
                    treatedFilters[objectName] = objectValue;
                } else {
                    auxiliarObject = {};
                    auxiliarObject[objectName] = objectValue;
                }
            }
        }

        return treatedFilters;
    };

})();