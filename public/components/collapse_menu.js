angular.module('infrushare').directive('deptmenu', function(){
  return {
    templateUrl: 'components/collapse_menu.html',
    scope: {
      departments: '=',
      dept: '=',
      level: '=',
      onFilter: '&'
    },
    restrict: 'E',
    replace: true,
    controller: function($scope) {
      $scope.filter = function(dept_no) {
        $scope.onFilter({'message':dept_no});
      };
  }
  }
});
