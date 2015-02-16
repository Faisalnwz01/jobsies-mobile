angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope, $http) {
//  $http.get("http://localhost:9000/api/things").then(function (thing){
//   console.log(thing)
//  })
// })

.controller('LoginCtrl', function($scope, $window, $rootScope, $ionicSlideBoxDelegate, $state, $http, $cordovaOauth) {
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    }
    $rootScope.hideNav = true;

    // $scope.apiCall = function(){
    //    $http.get("https://api.linkedin.com/v1/people/~?format=json").then(function(data){
    //            $scope.hit = "yes"
    //            $scope.UserInfo = data;
    //         })
    // }

    $scope.LinkedinLogin = function() {
      $cordovaOauth.linkedin('77jxr39wyisskn', 'WiIdb1rvQVoIa32c', [
          'r_emailaddress',
          'r_contactinfo',
          'r_fullprofile', 
          'r_basicprofile'
        ], 'DCEeFWf45A53sdfKef424')
        .then(function(result){
            $scope.pawel = result
            $http.get("https://api.linkedin.com/v1/people/~:(first-name,last-name,id,skills,twitterAccounts,publicProfileUrl,positions,pictureUrl,location,emailAddress,educations)?oauth2_access_token=" + $scope.pawel.access_token + "&format=json").then(function(data){
              $scope.UserInfo = data.data;
              //$http.get('http://localhost:9000/api/jobs/')
            }) 
            
           
            // // window.localStorage.setItem("access_token", result.access_token);
            // console.log(JSON.stringify(result));
            // //$state.go('tab.dash') 
           
        }, function(error){
            console.log(error);
        });
    }

})

// .controller('SavedCtrl', function ($scope, SaveJobs) {
//   SaveJobs.populateJobs().then(function (data) {
//     console.log(data, 'dataaaaaa')
//     $scope.savedJobs = data.data.jobs_saved
//   })

// })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
