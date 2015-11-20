var app = angular.module('app', ['ngRoute']); 

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'partials/main.html'
    })
    .when('/create', {
        templateUrl: 'partials/create.html'
    })
    .when('/members',{
        templateUrl: 'partials/users.html'
    })
    .when('/topic/:id',{
        templateUrl: 'partials/conversation.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
