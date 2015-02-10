'use strict';
angular.module('starter.services', [])
  .factory('userPreferences', function ($http) {
    return {
      savePreferences: function (user, items) {
        $http.put('http://localhost:9000/api/users/preferences/'+user._id, items)
      }
    };
  });
