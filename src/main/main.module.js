(function() {
  'use strict';

  angular
    .module('diary.main', ['ui.router'])
    .config(function($stateProvider) {
      $stateProvider
        .state('app', {
          url: '',
          templateUrl: 'main/main.html',
          controller: 'MainController',
          controllerAs: 'vm',
        });
    });
})();