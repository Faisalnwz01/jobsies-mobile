


angular.module('dash.controllers')

    .factory('SaveJobs', function($http, $stateParams, $q) {
        var user1;

        return {
            doHttpUser: function(done) {
                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(user) {
                    // $scope.user = user.data
                    user = user.data;
                    done(user);
                })
            },


            // SaveJobs.doHttpUser(function(user) {

                    // SaveJobs.getUser();
                    // SaveJobs.postJobs();
            // });
            postJobs: function(jobs) {

                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user.data._id;


                //when a user likes a job search the database for the job
                    return $http.put('http://localhost:9000/api/jobs/saveJobs/' + jobs.jobkey, {job:jobs, user:user})
                })
            },
            populateJobs: function() {
                 return new $q(function(resolve, reject) {
                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(data) {
                    var user = data

                    $http.get('http://localhost:9000/api/users/' + user.data._id + '/jobPopulate').then(function(job) {
                      console.log(job, 'jonnslsdjflks ')

                         resolve( job);
                    });
               })

})

            },

            // SaveJobs.populateJobs(function(user, job) {

            // });

            removeJobFromUser: function(job, user) {
            return new $q(function(resolve, reject) {
                        $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(data) {
                            var user = data.data
                            console.log(user, 'userssss')
                            console.log(job)
                            return $http.put('http://localhost:9000/api/users/' + user._id + '/removeJob/mobile/' + job._id).then(function(stuff) {
                                resolve();
                            })
                        })
                })

            },
            getRecruiterJobs: function() {
                return $http.get('http://localhost:9000/api/jobs/')
            },
            saveRecruiterJobs: function(job) {
                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user.data
                $http.get('http://localhost:9000/api/jobs/recruiterJobs/' + job._id).then(function(newJob) {
                    var recruiterJob = newJob.data[0];

                    if (recruiterJob.user_ids.indexOf(user._id) === -1) {
                        recruiterJob.user_ids.push(user._id);
                        $http.put('http://localhost:9000/api/jobs/updateRecruiterJob/' + recruiterJob._id, recruiterJob)
                    }
                    //if the job is not in the user's jobs_saved add it.
                    if (user.jobs_saved.indexOf(recruiterJob._id) === -1) {
                        $http.put('http://localhost:9000/api/users/mobile/' + user._id, {
                            jobs_saved: recruiterJob._id
                        })
                    }
                })
                 })
            }

        }
    });