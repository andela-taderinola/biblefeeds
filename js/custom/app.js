var bibleApp = angular.module('bibleApp', []);

bibleApp.controller('bibleController', ['$scope', '$http', function($scope, $http) {
  console.log("working...");
    $http.get('../../data/testUser.json').success(function (data){
    console.log(data.fname + " " + data.lname);
    console.log(data);
    $scope.username = data.login.email;
    console.log($scope.username);
    $scope.questions = data.questions;
    $scope.joined = data.joined;
  });

  
}]);