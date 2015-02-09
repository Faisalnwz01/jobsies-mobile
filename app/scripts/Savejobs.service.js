


angular.module('dash.controllers')

    .factory('SaveJobs', function($http, $stateParams) {
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
                    var user = user.data; 

                
                //when a user likes a job search the database for the job
                $http.get('http://localhost:9000/api/jobs/' + jobs.jobkey).then(function(job) {
                    //if the job does not exist add the current users id to the job and post it to the database
                    if (job.data.length === 0) {
                        jobs['user_ids'] = [user._id]
                        $http.post('http://localhost:9000/api/jobs/', jobs).then(function(new_job) {
                            // add the job id to the users schema
                            $http.put('http://localhost:9000/api/users/mobile/' + user._id, {
                                jobs_saved: [new_job.data._id]
                            })
                        });
                    } else {
                        var jobFromDb = job.data[0];
                        // else if the job does exist, 
                        //if the user id isn't saved to the job update the job
                        if (jobFromDb.user_ids.indexOf(user._id) === -1) {
                            jobFromDb.user_ids.push(user._id);
                            $http.put('http://localhost:9000/api/jobs//' + jobs.jobkey, job.data[0])
                        }
                        //if the job is not in the user's jobs_saved add it.
                        if (user.jobs_saved.indexOf(jobFromDb._id) === -1) {
                            $http.put('http://localhost:9000/api/users/mobile/' + user._id, {
                                jobs_saved: jobFromDb._id
                            })
                        }
                    }
                })
})
            },
            populateJobs: function(whatever) {
                
                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user
        
                    $http.get('http://localhost:9000/api/users/' + user.data._id + '/jobPopulate').then(function(job) {
                        whatever(job);
                    });
               })

                
                 
            },

            // SaveJobs.populateJobs(function(user, job) {

            // });

            removeJobFromUser: function(job, user) {
                $http.get('http://localhost:9000/api/users/mobile/' + $stateParams.id).then(function(user) {
                    var user = user
                return $http.put('http://localhost:9000/api/users/' + user._id + '/removeJob/' + job._id)
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
                    console.log(recruiterJob, "recruiter job")
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