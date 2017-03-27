angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,lists,$location) {
      $scope.users = lists.all();
      $scope.speechText = '';
      $scope.recognizedText = '';

     
      $scope.speakToText = function() {
        if (window.cordova) {
          TTS.speak({
                 text: $scope.speechText,
                 locale: 'en-US',
                 rate: 1.5
             }, function () {
                 // Do Something after success
             }, function (reason) {
                 // Handle the error case
             });
        }
      };
     
      $scope.record = function() {
         $scope.recognizedText = '';
         $scope.errorMsg = '';
         lists.setName($scope.recognizedText);
        
       var recognition = new webkitSpeechRecognition(); //for web
       // var recognition = new SpeechRecognition(); //for mobile device(android, ios)
       // recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                $scope.recognizedText = event.results[0][0].transcript;
               
                $scope.speechText = $scope.recognizedText;
                var result = lists.filterall($scope.recognizedText);
                lists.setName($scope.recognizedText);
                if(result!='' && $scope.speechText!=''){
                  $location.path('/tab/users');
                }else{
                  $scope.errorMsg = 'No text match from below list name. Please try again.'
                }

                 $scope.$apply()
                
            }
            
        };
        recognition.start();
      };
})

.controller('UsersCtrl', function($scope, lists) {

  $scope.users = lists.returnFilter();
  $scope.searchText = lists.getName();
  $scope.remove = function(chat) {
    lists.remove(chat);
  };
})

.controller('UserDetailCtrl', function($scope, $stateParams, lists) {
  $scope.user = lists.get($stateParams.userId);
})


