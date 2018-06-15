angular.module('app').config([
  '$stateProvider',
  function($stateProvider) {
    $stateProvider.state('home', {
      url: '',
      controller: 'HomeController',
      controllerAs: '$ctrl',
      templateUrl: 'templates/home.html',
    });
  },
]);
