/**
 * Created by lkc-dev on 3/3/17.
 */

(function () {
    'use strict';

    angular.module('cephas.userListModule').controller('userListCtrl', ['$scope', '$filter',  '$uibModal', 'WEB_URLS', 'NgTableParams', 'userListSvc', userListController]);

    function userListController($scope, $filter,  $uibModal, WEB_URLS, NgTableParams, userListSvc) {

        /**
         *
         * @type {userListController}
         * Without var self = this;
         * this in the html will not work
         * ng-table="vm.tableParams"
         */
        var self = this;

        self.userListURL = WEB_URLS.pendingApplicantsURL;

        self.pendingList = function () {
            console.log("self.pendingList");
            self.userListURL = WEB_URLS.pendingApplicantsURL;
            self.tableParams.reload();
        }

        self.approvedList = function () {
            console.log("self.approvedList");
            self.userListURL = WEB_URLS.approvedApplicantsURL;
            self.tableParams.reload();
        }

        self.rejectedList = function () {
            self.userListURL = WEB_URLS.rejectedApplicantsURL;
            self.tableParams.reload();
        }

        self.allList = function () {
            self.userListURL = WEB_URLS.allApplicantsURL;
            self.tableParams.reload();
        }

        $scope.userListSvc = userListSvc;

        self.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 20 // count per page
        }, {
            getData: function (params) {
                console.log("getData is called :    &&&&&");
                // ajax request to api
                return userListSvc.getUserList(self.userListURL).then(function (response) {
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

                    var filteredData = $filter('filter')($scope.data, filterObject);

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
1
                    // Finally we rertun the orderedData NOT: original data or filtered data
                    return $scope.data;
                }, function (response) {
                    console.log("ERROR " + response);
                });
            }
        });

        self.go = function (record_id) {
            console.log("The record id received: " + record_id);

            userListSvc.getUser(record_id, function (response) {
                //console.log(response);

                    var modalInstance = $uibModal.open({
                        animation : $scope.animationsEnabled,
                        templateUrl : 'partials/protected/user-approval/user.html',
                        controller : 'userCtrl',
                        //
                        backdrop : 'static',
                        resolve: {
                            user: function () {
                                return response;
                            }
                        }
                    });
                },
                function (result) {

                });
            //alert(record_id + " clicked");
            //dataSvc.setNewParticipant(false);
            //dataSvc.setRecordID(record_id);
            //$state.go('dataEntry');
        }
    }

})();