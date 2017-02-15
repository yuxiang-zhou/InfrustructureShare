angular.module('servData', []).factory(
  'getTotalDevices', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition, onSuccess){
      var query = $rootScope.host + 'api/querytotal/'+$rootScope.db+'/'+$rootScope.devices_table+'/'+condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
).factory(
  'getDevices', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition,from_num,to_num,onSuccess){
      var query = $rootScope.host + 'api/query/'+$rootScope.db+'/'+$rootScope.devices_table+'/设备代码/设备代码 as no,设备名称 as name,设备分类名称 as catagory,型号 as version,规格 as size,部门名称 as department,领用人 as contact,联系电话 as phone,管理人 as manager,存放地点 as location/'+from_num+'/'+to_num+'/'+condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
).factory(
  'getDepartments', ['$http', '$rootScope',
  function($http, $rootScope) {
    return function(condition,onSuccess){
      var query = $rootScope.host + 'api/query/'+$rootScope.db+'/'+$rootScope.department_table+'/部门编码/部门编码 as dept_no, 级别 as level, 父编码 as parent_no, 部门名称 as dept_name,有效标志 as is_active, 教育部上报标志 as is_reported,URPID, 财务编码 as finance_no, 资产编码 as asset_no, 部门性质 as dept_type, 备注 as comments/'+1+'/'+999999+'/'+condition;
      $http.get(query, { cache: false }).then(function(data){
        onSuccess(data);
      });
    }
  }]
);
