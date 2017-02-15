'use strict';

angular.module('infrushare')

.controller('MainCtrl',
  ['$scope', '$rootScope', '$location', '$interval',
  'getTotalDevices','getDevices', 'getDepartments',
  function ($scope, $rootScope, $location, $interval,
    getTotalDevices,getDevices,getDepartments) {

    // table data

    $scope.query = "";

    $scope.getQueryData = function(){
      if (!($scope.page_cache && 'query' in $scope.page_cache && $scope.page_cache.query == $scope.query)){
        $scope.page_cache = {};
        $scope.page_cache.query = $scope.query;
      }

      var devices_query = "设备名称 LIKE '%25"+$scope.query+"%25'";
      getTotalDevices(devices_query,function(data){
        $scope.total_devices = data.data[0].total;

        // pagination initialisation
        $scope.page_size = 10;
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.pageChanged = function() {
          if(!($scope.currentPage in $scope.page_cache)){
            var from_idx = 1 + ($scope.currentPage - 1) * $scope.page_size
            var to_idx = 1 + $scope.currentPage * $scope.page_size;
            getDevices(devices_query,from_idx,to_idx,function(data){
              $scope.page_cache[$scope.currentPage] = data.data;
            });
          }
        };

        $scope.pageChanged();
      });
    };

    $scope.getQueryData();

    // department data

    $scope.query_department = "";

    $scope.getQueryDepartment = function(){
      var department_query = "部门名称 LIKE '%25"+$scope.query_department+"%25'";
      getDepartments(department_query,function(data){
        $scope.departments = data.data;
        console.log($scope.departments);
      });
    };

    $scope.getQueryDepartment();
  }]
);
