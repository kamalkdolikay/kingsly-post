var app = angular.module("tujpu", ["ui.router"])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/home',
      templateUrl: '/home.html',
      controller: 'main',
      resolve: {
        postPromise: ['posts', function(posts){
        return posts.getAll();
        }]
      }
    })

    .state('posts',{
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'postctrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
        }]
      }
    })
  $urlRouterProvider.otherwise('home')
}])

app.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };

  o.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post) {
    return $http.post('/posts', post).success(function(data){
      o.posts.push(data);
    });
  };

  o.upvote = function(post) {
  return $http.put('/posts/' + post._id + '/upvote')
    .success(function(data){
      post.upvotes += 1;
    });
  };

  o.get = function(id) {
  return $http.get('/posts/' + id).then(function(res){
    return res.data;
  });
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
        posts.create({
            title:$scope.title,
            link:$scope.link
        })
        $scope.title = ''
        $scope.link = ''
    }
    $scope.upvotes = function(post){
        posts.upvote(post);
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