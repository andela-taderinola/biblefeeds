'use strict';

angular.module('Authentication')

  .factory('AuthenticationService',[
  '$http', 
  '$rootScope', 
  '$localStorage',

  function ($http, $rootScope, $localStorage) {
          
    var baseUrl = "https://bibleforum.herokuapp.com";

    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
            break;
        case 2:
            output += '==';
            break;
        case 3:
            output += '=';
            break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
    }

    var currentUser = getUserFromToken();

    return {
      save: function(data, success, error) {
          $http.post(baseUrl + '/signup', data).success(success).error(error)
      },
      login: function(data, success, error) {
          $http.post(baseUrl + '/login', data).success(success).error(error)
      },
      me: function(success, error) {
          $http.get(baseUrl + '/dashboard').success(success).error(error)
      },
      logout: function(success) {
        changeUser({});
        delete $localStorage.token;
        delete $localStorage.username;
        success();
      }
    };
}]);