angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope, $http) {
//  $http.get("http://localhost:9000/api/things").then(function (thing){
//   console.log(thing)
//  })
// })

.controller('LoginCtrl', function($scope, $window, $rootScope, $ionicSlideBoxDelegate, $cordovaOatuh) {
    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
    }
    $rootScope.hideNav = true;

        $scope.LinkedinLogin = function() {
        $cordovaOauth.linkedin('786reoygk0xat4', 'WmznyJwYuKQrgqXF', [
      'r_basicprofile',
      'r_emailaddress',
      'r_contactinfo',
      'r_fullprofile'
    ], 'state=DCEeFWf45A53sdfKef424').then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
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
