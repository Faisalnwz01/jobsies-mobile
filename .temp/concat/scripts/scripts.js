
var requestToken = "";
var accessToken = "";
var clientId = "client_id_here";
var clientSecret = "client_secret_here";
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'dash.controllers',  'ngCookies', 'ngResource', 'ionic.contrib.ui.tinderCards', 'ngAutocomplete'])

.run(["$ionicPlatform", function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    templateUrl: "templates/tabs.html",
    controller: 'DashCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash:id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.saved', {
    url: '/saved:id',
    views: {
      'tab-saved': {
        templateUrl: 'templates/tab-saved.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl'
        }
      }
    })
    // .state('tab.chat-detail', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

}]);

angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope, $http) {
//  $http.get("http://localhost:9000/api/things").then(function (thing){
//   console.log(thing)
//  })
// })

.controller('LoginCtrl', ["$scope", "$window", "$rootScope", "$ionicSlideBoxDelegate", "$state", "$http", "$cordovaOauth", function($scope, $window, $rootScope, $ionicSlideBoxDelegate, $state, $http, $cordovaOauth) {
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
              $scope.UserInfo = data.data
            }) 
            
           
            // // window.localStorage.setItem("access_token", result.access_token);
            // console.log(JSON.stringify(result));
            // //$state.go('tab.dash') 
           
        }, function(error){
            console.log(error);
        });
    }

}])

// .controller('SavedCtrl', function ($scope, SaveJobs) {
//   SaveJobs.populateJobs().then(function (data) {
//     console.log(data, 'dataaaaaa')
//     $scope.savedJobs = data.data.jobs_saved
//   })

// })

.controller('ChatDetailCtrl', ["$scope", "$stateParams", "Chats", function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}])

.controller('FriendsCtrl', ["$scope", function($scope) {
  $scope.friends = Friends.all();
}])

.controller('FriendDetailCtrl', ["$scope", "$stateParams", "Friends", function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}])

.controller('AccountCtrl', ["$scope", function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}]);

angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})
// .factory('User', function($resource, $stateParams, $http) {
//     return {
//       get: function() {
//         return $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id)
//       }
//     }
//   });

angular.module('dash.controllers', [])

.controller('DashCtrl', ["$scope", "$http", "$timeout", "$log", "$location", "$window", "$stateParams", "$ionicModal", function($scope, $http, $timeout, $log, $location, $window, $stateParams, $ionicModal) {}]);

// $ionicModal.fromTemplateUrl('my-modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });
//   $scope.openModal = function() {
//     $scope.modal.show();
//   };
//   $scope.closeModal = function() {
//     $scope.modal.hide();
//   };


//   $ionicModal.fromTemplateUrl('my-savedJobs.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.saved = modal;
//   });
//   $scope.openModalSave = function() {
//     $scope.saved.show();
//   };
//   $scope.closeModalSave = function() {
//     $scope.saved.hide();
//   };
  



// $scope.flip = false; 

// $scope.flipCard = function(){
//     if($scope.flip === false){
//     $scope.flip = true
// }
// else{
//     $scope.flip = false
// }



// }

//     $scope.loginOauth = function(provider) {

//         $window.location.href = 'http://localhost:9000/auth/' + provider;
//     };


//     // $scope.cardDestroyed = function(index) {
//     //     $scope.cards.splice(index, 1);
//     // };

//     // $scope.cardSwiped = function(index) {
//     //     var newCard = // new card data
//     //         $scope.cards.push(newCard);
//     // };



//         // $scope.user = user.data


// //          SaveJobs.doHttpUser(function(user) {
// //             $scope.loading = true; 
// //             console.log($scope.loading)

// // console.log($scope.user)
// //                  $scope.user = user





//         // $scope.currentJob = 0;
//         // $scope.page = 0;
//         // $scope.totalResults;
//         // $scope.jobsSeen = 0;

//         // The user can changes the type of job they are looking for and/or location preferences.
//         // these preferences are saved to the database and display new jobs results.
//         // $scope.updateJob = function(headline, location) {
//         //     $scope.searchDone = false;
//         //     $scope.user.jobUserLookingFor = headline;
//         //     $scope.user.locationUserWantsToWorkIn = location;
//         //     $scope.userHeadline = headline;
//         //     $scope.jobLocation = location;
//         //     userPreferences.savePreferences($scope.user, {location:location, headline:headline});
//         //     $scope.jobArray = [];
//         //     $scope.loading = true;
//         //     $scope.getRecruiterJobs($scope.user.jobUserLookingFor, $scope.user.locationUserWantsToWorkIn);
//         //     $scope.modal.hide();
//         // }




//         //this autocompletes the location search input with US cities
//         // $scope.options = {
//         //         country: 'us',
//         //         types: '(cities)'
//         //     }
//         //     // automatically fills in the job the user is searching for and location
//         //     //based on linkedin profile or updated preferences.
//         // $scope.userHeadline = $scope.user.jobUserLookingFor || $scope.user.linkedin.positions.values[0].title || "intern";
//         // $scope.locationCutter = function() {
//         //     $scope.jobLocation = $scope.user.locationUserWantsToWorkIn || $scope.user.linkedin.location.name || "new york";
//         //     if ($scope.jobLocation.toLowerCase().search('greater') !== -1) {
//         //         $scope.jobLocation = $scope.user.linkedin.location.name.toLowerCase().replace('greater', '')
//         //         $scope.jobLocation = $scope.jobLocation.replace('area', '')
//         //     }
//         // }
//         // $scope.locationCutter();

//         // //gets  jobs from the indeed api to display on the home page.
//         // $scope.getJobs = function(headline, location, start) {
//         //     indeedapi.getIndeedJobs(headline, location, start||0).then(function(jobs) {
//         //         if(jobs === "ZERO_RESULTS"){
//         //             $scope.searchDone = true;
//         //             $scope.loading = false;
//         //             alert("No jobs for this location and/or job title or skill. Check your input for spelling mistakes.")
//         //         }
//         //         else{
//         //             $scope.loading = false;
//         //             $scope.jobArray = jobs.data;
//         //             if(jobs.data[0].jobtitle == "No More Jobs"){
//         //                 $scope.searchDone = true;
//         //            }
//         //         }
//         //     })
//         // };

//         ///find the recruiter jobs in the database that match the user search criteria
//         /// if there are none, get the jobs from the indeed api.
//         $scope.getRecruiterJobs = function(userHeadline, jobLocation) {
//             SaveJobs.getRecruiterJobs().then(function(jobs) {
//                 var allJobsies = jobs.data;
//                 var jobsies = allJobsies.filter(function(element) {
//                     if (element.recruiter_id &&
//                         jobLocation.toLowerCase().search(element.formattedLocationFull.toLowerCase()) > -1 &&
//                         (element.summary.toLowerCase().search(userHeadline.toLowerCase()) > -1 || element.jobtitle.toLowerCase().search(userHeadline.toLowerCase()) > -1)) {
//                         return element
//                     }
//                 })
//                 $scope.numberOfRecruiterJobs = jobsies.length;
//                 $scope.jobArray = jobsies;
//                 $scope.loading = false;
//                 if ($scope.jobArray.length == 0) {
//                     $scope.loading = true;
//                     $scope.getJobs(userHeadline, jobLocation)
//                 }
//             })
//         };

//         $scope.getRecruiterJobs($scope.userHeadline, $scope.jobLocation);
//         //fills in the right sidebar with jobs that a user has previously saved

//          $scope.getSavedJobsies = function() {
//             $scope.savedJobsFrontPage = []
//             SaveJobs.populateJobs().then(function(jobs) {
//                 $scope.savedJobsFrontPage = jobs.data.jobs_saved || [];
//             })
//         }
//         $scope.getSavedJobsies = function() {
//             $scope.savedJobsFrontPage = []
//             // SaveJobs.populateJobs().then(function(jobs) {
//             //     $scope.savedJobsFrontPage = jobs.data.jobs_saved || [];
//             //     console.log($scope.savedJobsFrontPage)
//             // })
//             SaveJobs.populateJobs().then(function(job) {
//             $scope.savedJobsFrontPage = job.data.jobs_saved || [];

//               console.log($scope.savedJobsFrontPage, 'saved jobs front page')
//             });
//         }

//         $scope.getSavedJobsies()

// //generating cover letter for auto reply to jobs
//       $scope.generateCoverLetter = function(index){
//         console.log("generating")
//         var today = new Date().getFullYear();
//         $scope.contact_info_for_job = false;

//         console.log($scope.savedJobsFrontPage[index].contact_information)

//             if($scope.savedJobsFrontPage[index].contact_information){
//                 $scope.contact_info_for_job = true;
//             }

//             console.log($scope.contact_info_for_job)
//             if($scope.user.jobsought === undefined){
//                 var field = $scope.user.linkedin.positions.values[0].title
//             }


//         $scope.autoApplyEmail = "To Whom it may Concern, \n\nI read with interest your posting for "+ $scope.savedJobsFrontPage[index].jobtitle+" on indeed.com.\n\nI believe I possess the necessary skills and experience you are seeking\nand would make a valuable addition to " + $scope.savedJobsFrontPage[index].company + "\n\nAs my resume indicates, I possess more than " + (today - $scope.user.linkedin.positions.values[0].startDate.year) + " years of progressive\nexperience in the " + field + " field. \n\n" + "My professional history includes positions such as " + $scope.user.linkedin.positions.values[1].title + " at " + $scope.user.linkedin.positions.values[1].company.name + ",\nas well as" + $scope.user.linkedin.positions.values[2].title + " at " + $scope.user.linkedin.positions.values[2].company.name + "." + "\n\nMost recently, my responsibilities as " + $scope.user.linkedin.positions.values[0].title + " at " + $scope.user.linkedin.positions.values[0].company.name + " match the qualifications you are seeking.\n\nAs the" + $scope.user.linkedin.positions.values[0].title + ", my responsibilities included " + $scope.user.linkedin.positions.values[0].summary + "\n\nMy colleagues also relied on my skills in " + $scope.user.linkedin.skills.values[0].skill.name + ", " + $scope.user.linkedin.skills.values[1].skill.name + ", and " + $scope.user.linkedin.skills.values[2].skill.name + ". \n\nHere is a link to my online resume for your review\n" + "localhost:9000/formal/" + $scope.user._id + "\n\nI look forward to speaking with you further regarding your available position\nand am excited to learn more about " + $scope.savedJobsFrontPage[index].company + "." + "\n\nSincerely, \n" + $scope.user.name;
//         $scope.encodedEmail =  encodeURIComponent($scope.autoApplyEmail)

//       }


//         //save jobs to the database, also call indeed for more results
//         // after a user has gone through x jobs
//         $scope.saveOrPass = function(status, job) {
//             $scope.currentJob += 1;
//             if (job.recruiter_id != undefined) {
//                 if ($scope.numberOfRecruiterJobs >= 1) {
//                     if (status == 'save') {
//                         // toast('Job Saved!! :)', 3000)
//                         $scope.mobileSavedJobArray.push(job);
//                         SaveJobs.saveRecruiterJobs(job)
//                         setTimeout(function() {
//                             $scope.getSavedJobsies();
//                         }, 1000)
//                     } else if (status == 'pass') {
//                         // toast('Job Passed :(', 3000)
//                     }
//                     if ($scope.numberOfRecruiterJobs == 1) {
//                         $scope.getJobs($scope.user.jobUserLookingFor || $scope.userHeadline, $scope.user.locationUserWantsToWorkIn || $scope.jobLocation);
//                     }
//                     $scope.numberOfRecruiterJobs -= 1;
//                 }
//             } else {
//                 $scope.jobsSeen += 1;
//                 if($scope.currentJob == $scope.jobArray.length){
//                     $scope.currentJob = 0;
//                     $scope.jobArray = [];
//                     $scope.loading = true;
//                     $scope.getJobs($scope.user.jobUserLookingFor||$scope.userHeadline, $scope.user.locationUserWantsToWorkIn||$scope.jobLocation, $scope.jobsSeen + 12)
//                 }
//                 if (status == 'save') {
//                     // toast('Job Saved!! :)', 3000)
//                     if(job.numLikes){
//                         job.numLikes +=1;
//                     }
//                     else{job.numLikes =1}
//                     SaveJobs.postJobs(job)
//                     setTimeout(function() {
//                         $scope.getSavedJobsies();
//                     }, 1000)
//                 }
//                 // if (status == 'pass') {
//                 //     toast('Job Passed :(', 3000)
//                 // }
//             }
//             console.log("end of save", $scope.currentJob);
//         }

//         $scope.removeJobFromUser = function(job) {
//             SaveJobs.removeJobFromUser(job, $scope.user)
//             .then(function() {
//                 $scope.getSavedJobsies();
//             })
//         }

// })

//  /*
//    * if given group is the selected group, deselect it
//    * else, select the given group
//    */
//   $scope.toggleGroup = function(group) {
//     if ($scope.isGroupShown(group)) {
//       $scope.shownGroup = null;
//     } else {
//       $scope.shownGroup = group;
//     }
//   };
//   $scope.isGroupShown = function(group) {
//     return $scope.shownGroup === group;
//   };

"use strict";

 angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'http://api.yoursite.com/'})

;