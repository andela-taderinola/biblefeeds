'use strict';

angular.module('Bible')

.controller('bibleController', [
  '$scope',
  '$http',
  '$location',
  function ($scope, $http, $location) {
  $scope.inputText = "Gen 1";
  $scope.key = "517d06fdbe90e270534625197ed15845";

  $scope.open = function () {
    $scope.searchBible();
  }

  $scope.searchBible = function() {
    if(!$scope.inputText.trim()) {
      $scope.info = "Input field must not be empty";
      return;
    }

    $scope.info = "Please wait...";
    $http({url: 'http://api.biblia.com/v1/bible/search/DARBY.js', method: 'GET', params: {query: $scope.inputText, sort: "passage", key: $scope.key}}).
        success(function (data) {
          $scope.info = "Done";
          if(data.hitCount > 0) {
            $scope.info = "";
            $scope.searchResponse = data;
            $scope.searchResult = $scope.searchResponse.results;
            $scope.searchItem = $scope.inputText;
            $("#search").show();
            $("#bible").fadeOut(1000);
            $("#searchListContainer").fadeIn(1500);
            $(".toReveal").fadeIn(1000);
            $scope.rollUp();
          } else {
            $scope.info = "Checking in Bible...";
            $scope.openBible();
          }
    }).
        error(function (data, status) {
          $scope.failEvent(status);
    });  
} //end of function openBible

$scope.openBible = function (status){
  $http({url: 'http://api.biblia.com/v1/bible/content/DARBY.html.json', method: 'GET', params: {passage: $scope.inputText, style: "fullyFormattedWithFootnotes", key: $scope.key}}).
      success(function (data) {
        $scope.info = "Done";
        $scope.response = data;
        $scope.verse = $scope.response.text;
        $scope.display = '<div id="content">' + $scope.verse + '</div>';
        $("#bible").html($scope.display);
        $("#bible").fadeIn(1000);
        $("#search").fadeOut(800);
        $scope.info = "";
        $scope.rollUp();
    }).
      error(function (data, status) {
        $scope.failEvent(status);
        return;
    });
      $scope.rollUp(); 
  }

$scope.rollUp = function() {
  $(".navbar").css({
  "transition": "0.5s ease-in-out .5s",
  "-webkit-transition": "0.5s ease-in-out .5s",
  "-moz-transition": "0.5s ease-in-out .5s",
  "-o-transition": "0.5s ease-in-out .5s",
  "position": "absolute",
  "width": "100%",
  "top": "-3em",
  "height": "4em",
  "padding-top": "0.1em",
  "z-index": "1",
  "text-align": "center"
});

  $( "div" ).hover(
    function() {
      $(".navbar").css({"top": "0"});
    }, function() {
      $(".navbar").css({"top": "-3em"});
    }
  );
}

$scope.failEvent = function(status) {
  if(status === 0) {
    $scope.info = "There seems to be a problem with your internet connection.";
  }
  else if (status === 404) {
    $scope.info = "Sorry, didn't get that.";
  }
  else if (status === 500) {
    $scope.info = "Server error. Please try again.";
  }
  else {
    $scope.info = "Looks like there's a little hiccup: (" + status + ")";
  }

  $(".navbar").css("top", "0");
  $( "div" ).hover(
  function() {
    $(".navbar").css({"top": "0"});
  }, function() {
    $(".navbar").css({"top": "0"});
  }
);
}
}]);