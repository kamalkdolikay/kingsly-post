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
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'postctrl'
    })
  $urlRouterProvider.otherwise('home')
}])

app.factory('posts', [ function(){
  var o = {
    posts: []
  };
  return o;
}]);

app.controller("main",[
"$scope", "posts",
function($scope,posts){
    console.log(posts)
    console.log("posts")
    $scope.posts = posts.posts;
    $scope.posts = [
        {title:"BJP", votes:2},
        {title:"AAP", votes:3},
        {title:"Congress", votes:1},
    ]
    $scope.addPost = function(){
        if(!$scope.title || $scope.title === ''){ return }
        $scope.posts.push({
            title:$scope.title,
            link:$scope.link,
            votes:0,
            comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
        })
        $scope.title = ''
        $scope.link = ''
    }
    $scope.upvotes = function(post){
        post.votes += 1
    }
}])

app.controller("postctrl",[
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
    console.log(posts)
    console.log("posts")
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
        if($scope.body === '') { return }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = ''
    }
}])