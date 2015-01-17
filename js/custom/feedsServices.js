'use strict';

angular.module('Questions')

.factory('feedsService',[
  '$http', 
  '$rootScope', 
  '$localStorage',

  function ($http, $rootScope, $localStorage) {
          
      var baseUrl = "http://localhost:5000";
      // function changeUser(user) {
      //     angular.extend(currentUser, user);
      // }



      // function getUserFromToken() {
      //     var token = $localStorage.token;
      //     var user = {};
      //     if (typeof token !== 'undefined') {
      //         var encoded = token.split('.')[1];
      //         user = JSON.parse(urlBase64Decode(encoded));
      //     }
      //     return user;
      // }

      // var currentUser = getUserFromToken();

      return {
          postQuestion: function(username, success) {
              $http.post(baseUrl + '/api/users/' + username + 'questions').success(success)
          },
          getUserQuestions: function(username, success) {
            $http.delete(baseUrl + '/api/users/' + username + '/questions').success(success)
          },
          deleteQuestion: function(username, question_id, success) {
            $http.delete(baseUrl + '/api/users/' + username + '/questions/' + question_id).success(success)
          },
          updateQuestion: function(username, question_id, success) {
            $http.put(baseUrl + '/api/users/' + username + '/questions/' + question_id).success(success)
          },
          getAllQuestions: function(success) {
              $http.get(baseUrl + '/api/questions').success(success)
          },
          getAnswers: function(question_id, success) {
            $http.get(baseUrl + '/api/questions/' + question_id + '/answers').success(success)
          },
          postAnswer: function(question_id, success) {
            $http.post(baseUrl + '/api/questions/' + question_id + '/answers').success(success)
          },
          deleteAnswer: function(question_id, answer_id, success) {
            $http.delete(baseUrl + '/api/questions/' + question_id + '/answers/' + answer_id).success(success)
          },
          updateAnswer: function(answer_id, success) {
            $http.put(baseUrl + '/api/answers/' + answer_id).success(success)
          },
          getUserAnswers: function(question_id, success) {
            $http.get(baseUrl + '/users/' + username + '/answers').success(success)
          },
          logout: function(success) {
            delete $localStorage.token;
            delete $localStorage.username;
          }


          // me: function(success, error) {
          //     $http.get(baseUrl + '/me').success(success).error(error)
          // },
          // logout: function(success) {
          //     changeUser({});
          //     delete $localStorage.token;
          //     success();
          // }
      };
}]);