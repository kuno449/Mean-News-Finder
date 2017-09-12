function AppCtrl($scope, $http) {

var refresh = function(){
  $http.get('/newslist').success(function(response){
    $scope.newslist = response;
    $scope.news = "";
  });
};

refresh();

$scope.addNews = function(){
  $http.post('/newslist', $scope.news).success(function(response){
    console.log(response);
    refresh();
  });
}

$scope.remove= function(id){
  $http.delete('/newslist/' + id).success(function(response){
    refresh();
  });
};

$scope.search = function(keyword){
  console.log(keyword);
  $http.get('/search/' + keyword).success(function(response){
    $scope.newslist = response;
  });
};

}
