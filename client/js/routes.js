var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/main.html'
    })
    .when('/create', {
        templateUrl: 'partials/create.html'
    })
    .when('/partial1',{
        templateUrl: 'partials/partial1.html'
    })
    .when('/topic/:id',{
        templateUrl: 'partials/conversation.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
