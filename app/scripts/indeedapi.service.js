'use strict';

angular.module('starter.controllers')
    .factory('indeedapi', function($http, $q, Savejobs, $stateParams) {
        return {
            getIndeedJobs: function(query, location, start) {
                return new $q(function(resolve, reject) {
                    $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(getUser) {
                        if (location.indexOf(",") > -1) {
                            var new_location = location.split(",")[0];
                        } else {
                            new_location = location;
                        }
                        $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + new_location + "&sensor=true")
                            .then(function(data) {
                                var state = data.results[0].address_components[2].short_name;
                                $http.put('http://localhost:9000/api/jobs/getIndeedJobs/', {
                                    query: query,
                                    city: new_location,
                                    state: state,
                                    start: start
                                })
                                    .then(function(search_response) {

                                        $http.get('http://localhost:9000/api/users/'+getUser._id+'/jobPopulate').then(function(user){
                                        var savedJobs = user.data.jobs_saved;
                                        var savedJobKeys = [];
                                        for (var j=0; j<savedJobs.length; j++) {
                                            savedJobKeys.push(savedJobs[j].jobkey)
                                        }
                                        var jobArray = [];
                                        for (var i=0; i<search_response.data.results.length; i++){
                                            if (savedJobKeys.indexOf(search_response.data.results[i].jobkey) === -1) {
                                                jobArray.push(search_response.data.results[i])
                                            }
                                        }
                                        var totalResults = search_response.data.totalResults;
                                        $http.post('http://localhost:9000/api/jobs/cheerio', jobArray)
                                            .success(function(results) {
                                                jobArray = results;
                                                resolve({
                                                    jobArray: jobArray,
                                                    totalResults: totalResults
                                                })
                                            })
                                        })    

                                    })//.then indeed search response
                            })

                    })///get user id

                })///return new q

            }
        };
    });