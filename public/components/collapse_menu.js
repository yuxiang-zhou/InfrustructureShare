angular.module('infrushare').directive('deptmenu', function(){
  return {
    templateUrl: 'components/collapse_menu.html',
    scope: {
      departments: '=',
      dept: '=',
      level: '='
    },
    restrict: 'E',
    replace: true
  }
});
