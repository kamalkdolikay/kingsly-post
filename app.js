var app = angular.module("tujpu", ["ui.router"])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '/home.html',
      controller: 'main'
    })

    .state('posts',{
      url: '/posts',
      templateUrl: '/posts.html',
      controller: 'postctrl'
    })
  //$urlRouterProvider.otherwise('home')
}])

app.factory('posts', ['$http', 'auth', function($http, auth){
    var o = {
    posts: []
  };
  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };

  o.create = function(post) {
  return $http.post('/posts', post, {

  }).success(function(data){
    o.posts.push(data);
    });
  };
  return o;
}])

app.controller('main', function($scope, $http) {
    $scope.sub = function() {
        $http.post('/home',$scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    }
});

app.controller("postctrl",[
"$scope",
function($scope){
    $scope.name = "kamal"
}])

