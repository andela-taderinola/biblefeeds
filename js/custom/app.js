(function () {
  //declare modules
  angular.module('Authentication', []);
  angular.module('Questions', []);

  //main app module
  angular.module('bibleFeeds', [
    'Authentication',
    'Questions',
    'ngRoute',
    'ngStorage'
  ])

  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/bible', {
          templateUrl: 'partials/bible.html',
          controller: 'bibleController'
        }).
        when('/questions', {
          templateUrl: 'partials/questions.html',
          controller: 'feedsController'
        }).
        when('/register', {
          templateUrl: 'partials/signup.html',
          controller: 'loginController'
        }).
        otherwise({
          redirectTo: '/'
        });
  }]);
})();