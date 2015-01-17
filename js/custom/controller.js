angular.module('Questions')

.controller('feedsController', [
  '$scope',
  '$http',
  '$location',
  '$localStorage',
  'feedsService',
  function ($scope, $http, $location, $localStorage, feedsService) {

  $("a.answersLink").click(function() {
    console.log('clicked');
    var text = $(this).next().text();
    console.log('innerText id', text);
  });

  console.log("working...");
  $scope.currentUser = $localStorage.username;
  $scope.currentQuestionId = $localStorage.currentQuestionId;
  $scope.guestName = "Anoni Moss"
  console.log("currentUser", $scope.currentUser);
  console.log('currentQuestionId', $scope.currentQuestionId);
    var temp = [];
    // delete $localStorage.temp;
    // feedsService.getAllQuestions(function (data){
    //   $scope.questions = data;
    //   for(i = 0; i< $scope.questions.length; i++) {
    //     if($scope.questions[i].answers > 0) {
    //       feedsService.getAnswers($scope.questions[i]._id,function (data) {
    //           temp.push(data);
    //           console.log('Within the loop', temp);
    //           $scope.answers = temp;
    //         });
    //     }
    //   }
      
    //   console.log('Outside the loop', $scope.answers);
      
    // });

    // $scope.getPostTime = function(datePosted) {

    // };
    $scope.postQuestion = function() {
      $scope.questionAuthor = $scope.guestName;
      if(!$scope.guestName) {
        questionAuthor = $localStorage.username;
      }
      var formData = {
        content: $scope.questionContent,
        author: $scope.questionAuthor
      };

      feedsService.postQuestion($scope.currentUser, formData, function (response) {
        if(response.type === false) {
          alert(response.data);
        } else {
          $scope.sent = true;
        }
      });
    };

    $scope.showAllQuestions = function() {
      feedsService.getAllQuestions(function (data) {
        $scope.questions = data;
        for(i=0; i<$scope.questions.length; i++) {
          temp.push($scope.questions[i]._id);
          $scope.idArray = temp;
        }
      });
    };

    $scope.storeId = function (currentId) {
      console.log('id from click', currentId);
      $scope.currentQuestionId = currentId;
      $localStorage.currentQuestionId = currentId;
    };

    $scope.showAnswers = function() {
      console.log('questionid', $scope.currentQuestionId);
      feedsService.getQuestionById($scope.currentQuestionId, function (data) {
        $scope.question = data;
        console.log('question', $scope.question);
        feedsService.getAnswers($scope.question._id, function (data) {
          $scope.answers = data;
          console.log('answers', $scope.answers);
        });
      });
    };

    $scope.postAnswer = function() {
      var formData = {
        content: $scope.answerContent
      };

      feedsService.postAnswer($scope.currentQuestionId, formData, function (response) {
        if(response.type === false) {
          alert(response.data);
        } else {
          
        }
      });
      $scope.showAnswers();
    };

    $scope.logout = function() {
        feedsService.logout();
        $scope.currentUser = "";
    };

}]);