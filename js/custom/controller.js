angular.module('Questions')

.controller('feedsController', [
  '$scope',
  '$http',
  '$location',
  '$localStorage',
  'feedsService',
  function ($scope, $http, $location, $localStorage, feedsService) {
  console.log("working...");
  $scope.currentUser = $localStorage.username;
  console.log("currentUser", $scope.currentUser);
    var temp = [];
    // delete $localStorage.temp;
    feedsService.getAllQuestions(function (data){
      $scope.questions = data;
      for(i = 0; i< $scope.questions.length; i++) {
        if($scope.questions[i].answers > 0) {
          feedsService.getAnswers($scope.questions[i]._id,function (data) {
              temp.push(data);
              console.log('Within the loop', temp);
              $scope.answers = temp;
            });
        }
      }
      
      console.log('Outside the loop', $scope.answers);
      
    });

    // $scope.getPostTime = function(datePosted) {

    // };

    $scope.showAnswers = function(question_id) {
      
    };

    $scope.logout = function() {
        feedsService.logout();
        $scope.currentUser = "";
    };

  $(".showAnswers").click(function() {
    $(this).parent().parent().parent().next().slideToggle(400);
  });

}]);