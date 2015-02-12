'use strict';

angular.module('starter.controllers')
    .factory('indeedapi', function($http, $q, $stateParams) {
        return {
            getIndeedJobs: function(query, location, start) {
                return new $q(function(resolve, reject) {
                    $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(getUser) {
                        var user_info = getUser.data._id;
                        if (location.indexOf(",") > -1) {
                            var new_location = location.split(",")[0];
                        } else {
                            new_location = location;
                        }
                        $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + new_location + "&sensor=true")
                            .then(function(data) {
                                if(data.status === "ZERO_RESULTS"){
                                    resolve(data.status);
                                }
                                else {
                                    var state = data.results[0].address_components[2].short_name;
                                    $http.put('http://localhost:9000/api/jobs/getIndeedJobs/', {
                                        query: query,
                                        city: new_location,
                                        state: state,
                                        start: start,
                                        user_info: user_info
                                    })
                                        .then(function(search_response) {

                                            resolve(search_response) 

                                        })//.then indeed search response
                                }
                            })

                        })///get user id

                })///return new q

            }
        };
    });