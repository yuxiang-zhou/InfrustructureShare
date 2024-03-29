'use strict';
/**
 * @ngdoc overview
 * @name marketApp
 * @description
 * # marketApp
 *
 * Main module of the application.
 */
var app = angular.module('infrushare', [
  'ui.router',
  'servData',
  'ngSanitize',
  'smart-table',
  'ui.bootstrap'
]).config([
  '$stateProvider','$urlRouterProvider', '$compileProvider',
  function ($stateProvider,$urlRouterProvider,$compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);

    $urlRouterProvider.when('', '/index');
    $urlRouterProvider.when('/', '/index');
    $urlRouterProvider.otherwise('/notfound');

    $stateProvider.state('index', {
      url:'/index',
      templateUrl: 'views/template.html',
      controller: 'MainCtrl'
    });
}
]).run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.host = '/';
  $rootScope.db = 'URP';
  $rootScope.devices_table = 'View_URP_ASS_仪器设备_设备明细信息 a left join  URP_ASS_实验室管理_大型设备信息 b on a.设备代码 = b.设备代码';
  $rootScope.department_table = 'URP_ASS_仪器设备_部门基本信息';
}]);
