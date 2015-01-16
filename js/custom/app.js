var bibleApp = angular.module('bibleApp', []);

bibleApp.controller('bibleController', ['$scope', '$http', function($scope, $http) {
  console.log("working...");
    
    $http.get('http://localhost:5000/api/questions').success(function (data){
      $scope.questions = data;

      // $scope.username = data.login.email;
      // console.log($scope.username);

  });

  $scope.showAnswers = function (question_id) {
    var arr = [];
    for(i=0; i<$scope.questions.length; i++) {
      $scope.count = i;
      if($scope.questions[i].answers > 0) {
        $http.get('http://localhost:5000/api/questions/' + $scope.questions[i]._id + '/answers')
          .success(function (data) {
            arr.push(data[0]);
            console.log('Within the loop', arr);
          });
      }
    };
    $scope.answers = arr;
    console.log('Final array', $scope.answers);
    $(".answer").slideToggle(500);
  };
  
}]);