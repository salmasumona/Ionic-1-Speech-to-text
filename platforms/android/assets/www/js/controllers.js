angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,lists,$location) {
      $scope.speechText = '';
      $scope.recognizedText = '';
     
      $scope.speakText = function() {
        console.log('1------');
        if (window.cordova) {
          console.log('2------');
          TTS.speak({
                 text: $scope.speechText,
                 locale: 'en-GB',
                 rate: 1.5
             }, function () {
                 // Do Something after success
             }, function (reason) {
                 // Handle the error case
             });
        }
      };
     
      $scope.record = function() {
               /* var result = lists.filterall('Ben Sparrow');
                if(result!='' || result!=null || result!=undefined){
                  $location.path('/tab/users');
                }else{
                  $scope.errorMsg = 'No result found. Plase try again. '
                }*/
        var recognition = new SpeechRecognition();
        recognition.onresult = function(event) {
            if (event.results.length > 0) {
                $scope.recognizedText = event.results[0][0].transcript;
                //alert('1$scope.recognizedText----',$scope.recognizedText);
                $scope.$apply()
                //alert('2$scope.recognizedText----',$scope.recognizedText);
                $scope.speechText = $scope.recognizedText;
                //$scope.speakText();
                var result = lists.filterall($scope.recognizedText);
                lists.setName($scope.recognizedText);
                //alert(result);
                if(result!=''){
                  alert('1');
                  $location.path('/tab/users');
                }else{
                  $scope.errorMsg = 'No result found. Plase try again. '
                }
            }
        };
        recognition.start();
      };
})

.controller('UsersCtrl', function($scope, lists) {

  $scope.users = lists.returnFilter();
  console.log($scope.users);
  $scope.searchText = lists.getName();
  console.log('$scope.users---',$scope.users);
  $scope.remove = function(chat) {
    lists.remove(chat);
  };
})

.controller('UserDetailCtrl', function($scope, $stateParams, lists) {
  $scope.user = lists.get($stateParams.userId);
})


