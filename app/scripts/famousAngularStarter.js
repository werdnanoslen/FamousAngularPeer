'use strict';

angular.module('famousAngularStarter',
  ['ui.router',
    'famous.angular' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/main.html',
        controller: 'DraggableCtrl'
      })

    $urlRouterProvider.otherwise('/');
  })
;
