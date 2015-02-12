


angular.module('dash.controllers')

    .factory('SaveJobs', function($http, $stateParams, $q) {
        var user1;

        return {
            doHttpUser: function(done) {
                $http.get('https://jobsies.herokuapp.com/api/users/mobile/' + $stateParams.id).then(function(user) {
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

                $http.get('https://jobsies.herokuapp.com/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user.data;


                //when a user likes a job search the database for the job
                $http.get('https://jobsies.herokuapp.com/api/jobs/' + jobs.jobkey).then(function(job) {
                    //if the job does not exist add the current users id to the job and post it to the database
                    if (job.data.length === 0) {
                        jobs['user_ids'] = [user._id]
                        $http.post('https://jobsies.herokuapp.com/api/jobs/', jobs).then(function(new_job) {
                            // add the job id to the users schema
                            $http.put('https://jobsies.herokuapp.com/api/users/mobile/' + user._id, {
                                jobs_saved: [new_job.data._id]
                            })
                        });
                    } else {
                        var jobFromDb = job.data[0];
                        // else if the job does exist,
                        //if the user id isn't saved to the job update the job
                        if (jobFromDb.user_ids.indexOf(user._id) === -1) {
                            jobFromDb.user_ids.push(user._id);
                            $http.put('https://jobsies.herokuapp.com/api/jobs/' + jobs.jobkey, job.data[0])
                        }
                        //if the job is not in the user's jobs_saved add it.
                        if (user.jobs_saved.indexOf(jobFromDb._id) === -1) {
                            $http.put('https://jobsies.herokuapp.com/api/users/mobile/' + user._id, {
                                jobs_saved: jobFromDb._id
                            })
                        }
                    }
                })
})
            },
            populateJobs: function() {
                 return new $q(function(resolve, reject) {
                $http.get('https://jobsies.herokuapp.com/api/users/mobile/' + $stateParams.id).then(function(data) {
                    var user = data

                    $http.get('https://jobsies.herokuapp.com/api/users/' + user.data._id + '/jobPopulate').then(function(job) {
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
                        $http.get('https://jobsies.herokuapp.com/api/users/mobile/' + $stateParams.id).then(function(data) {
                            var user = data.data
                            console.log(user, 'userssss')
                            console.log(job)
                            return $http.put('https://jobsies.herokuapp.com/api/users/' + user._id + '/removeJob/mobile/' + job._id).then(function(stuff) {
                                resolve();
                            })
                        })
                })

            },
            getRecruiterJobs: function() {
                return $http.get('https://jobsies.herokuapp.com/api/jobs/')
            },
            saveRecruiterJobs: function(job) {
                $http.get('https://jobsies.herokuapp.com/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user.data
                $http.get('https://jobsies.herokuapp.com/api/jobs/recruiterJobs/' + job._id).then(function(newJob) {
                    var recruiterJob = newJob.data[0];

                    if (recruiterJob.user_ids.indexOf(user._id) === -1) {
                        recruiterJob.user_ids.push(user._id);
                        $http.put('https://jobsies.herokuapp.com/api/jobs/updateRecruiterJob/' + recruiterJob._id, recruiterJob)
                    }
                    //if the job is not in the user's jobs_saved add it.
                    if (user.jobs_saved.indexOf(recruiterJob._id) === -1) {
                        $http.put('https://jobsies.herokuapp.com/api/users/mobile/' + user._id, {
                            jobs_saved: recruiterJob._id
                        })
                    }
                })
                 })
            }

        }
    });