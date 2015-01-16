angular.module('bibleApp')

.controller('bibleController', ['$scope', '$http', '$location', '$localStorage',
  function($scope, $http, $location, $localStorage) {
  console.log("working...");
    var temp = [];
    // delete $localStorage.temp;
    $http.get('http://localhost:5000/api/questions').success(function (data){
    $scope.questions = data;

    for(i = 0; i< $scope.questions.length; i++) {

        $scope.count = i;

        if($scope.questions[i].answers > 0) {

          $http.get('http://localhost:5000/api/questions/' + $scope.questions[i]._id + '/answers')
            .success (function (data) {
              temp.push(data);
              console.log('Within the loop', temp);
              $scope.answers = temp;
            });

        }

        
    };
      
      console.log('Outside the loop', $scope.answers);
      
    });

    console.log('Questions', $scope.questions);

}]);