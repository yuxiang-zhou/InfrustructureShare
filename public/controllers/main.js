'use strict';

angular.module('infrushare')

.controller('MainCtrl',
  ['$scope', '$rootScope', '$location', '$interval', '$uibModal',
  'getTotalDevices','getDevices', 'getDepartments',
  function ($scope, $rootScope, $location, $interval, $uibModal,
    getTotalDevices,getDevices,getDepartments) {

      // department data

      $scope.query_department_no = 1;
      $scope.query_department = "";

      $scope.getQueryDepartment = function(){
        // var department_query = "部门名称 LIKE '%25"+$scope.query_department+"%25'";
        var department_query = "部门名称 LIKE '%25%25'";
        getDepartments(department_query,function(data){

          if('code' in data.data) {
            console.log(data.data);
            $scope.getQueryDepartment();
            return
          }

          $scope.departments = data.data;
          $scope.filter = function(dept){
            $scope.filter_dept = dept.message;
            $scope.query_department_no = dept.message.dept_no;
            console.log($scope.query_department_no);
            $scope.getQueryData();
          };
          console.log($scope.departments);
          $scope.getQueryData();
        });
      };


    // table data

    $scope.query = "";
    $scope.query_loading = true;
    $scope.getQueryData = function(){
      $scope.query_loading = true;

      if (!($scope.page_cache && 'query' in $scope.page_cache && $scope.page_cache.query == ($scope.query + ',' + $scope.query_department_no))){
        $scope.page_cache = {};
        $scope.page_cache.query = ($scope.query + ',' + $scope.query_department_no);
      }

      var devices_query = "设备名称 LIKE '%25"+$scope.query+"%25'";
      devices_query += " AND ";
      devices_query += "部门代码 LIKE '"+$scope.query_department_no+"%25'";
      getTotalDevices(devices_query,function(data){
        console.log(data.data);

        if('code' in data.data) {
          console.log(data.data);
          $scope.getQueryData();
          return
        }

        $scope.total_devices = data.data[0].total;

        // pagination initialisation
        $scope.page_size = 20;
        $scope.maxSize = 10;
        $scope.currentPage = 1;


        $scope.pageChanged = function() {
          if(!($scope.currentPage in $scope.page_cache)){
            var from_idx = 1 + ($scope.currentPage - 1) * $scope.page_size
            var to_idx = 1 + $scope.currentPage * $scope.page_size;
            getDevices(devices_query,from_idx,to_idx,function(data){

              if('code' in data.data) {
                console.log(data.data);
                $scope.pageChanged();
                return
              }

              $scope.page_cache[$scope.currentPage] = data.data;
              console.log(data.data);
              $scope.query_loading = false;
            });
          }
        };

        $scope.pageChanged();
      });
    };

    $scope.getQueryDepartment();

    $scope.openModal = function(device){
      $uibModal.open({
        animation: false,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/deviceModal.html',
        size: 'lg',
        controller: 'ModalResultInstanceCtrl',
        resolve: {
        device: function () {
          return device;
        }
      }
      });
    };



  }]
).controller('ModalResultInstanceCtrl', function(
  $scope, $uibModalInstance, device, getDevice
) {
  $scope.isloading = true;
  // console.log(device.no);
  getDevice(device.no, function(data){
    $scope.selected_device = data.data[0];
    $scope.isloading = false;
    console.log(data.data);
  });

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
