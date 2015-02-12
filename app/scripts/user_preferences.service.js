'use strict';
angular.module('starter.services', [])
  .factory('userPreferences', function ($http) {
    return {
      savePreferences: function (user, items) {
        $http.put('https://jobsies.herokuapp.com/api/users/preferences/mobile/'+user._id, items)
      }
    };
  });
