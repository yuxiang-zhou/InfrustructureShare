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
  $rootScope.host = 'http://178.62.38.12:3000/';
  $rootScope.db = 'URP';
  $rootScope.devices_table = 'View_URP_ASS_仪器设备_设备明细信息';
  $rootScope.department_table = 'URP_ASS_仪器设备_部门基本信息';
}]);
