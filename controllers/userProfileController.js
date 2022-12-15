import User from "../models/userSchema.js";
import Review from "../models/reviewSchema.js";

const UserProfile = {
    loadUserProfile: function(req, res) {
        const userID = req.params.userID;
        const query = {_id: userID};
        const reviewQuery = {userID: userID};
        var test = [];
        var isFollowed = 0;

    

        Review.find({'likedBy_userID': {$elemMatch: {userID:req.user.id}}}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                rows.forEach(function(rev){
                    test.push({
                        id: rev._id,
                    likes: rev.likes})
                });
                
            }  
            
        })

        User.find(query,function(err, result){
            if(err){
                console.log(err);
            }
            else{
                Review.find(reviewQuery, null, {sort: {_id: -1}}, function(err, reviews){
                    if(err){
                        console.log(err);
                    }
                    else{
                        User.find(query, {'followers': {$elemMatch: {userID:req.user.id}}}, function(err, follower){
                            if(err){
                                console.log(err);
                            }
                            else{
                                if(follower[0].followers.length > 0){
                                    isFollowed = 1;
                                }
                                res.render('userProfile',{
                                    user: req.user,
                                    user_profile: result[0],
                                    reviews: reviews,
                                    test: test,
                                    isFollowed
                                });
                            }
                        })
                    }
                })
               
            }
        })
        
       
    },

    incrementFollowers: function(req, res) {
        const accID = req.params.accID;
        const query = {_id: accID};
        const accUsername = req.body.accUsername;
        const userID = req.body.userID;
        const userUsername = req.body.userUsername;
        const userQuery = {_id: userID}


        User.findByIdAndUpdate(query, { $push: { followers: {userID: userID, username:userUsername}} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                User.findByIdAndUpdate(userQuery, { $push: { following: {userID: accID, username: accUsername}} }, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('back');
                    }
                })
            }
        })
          
    },

    decremnentFollowers: function(req, res) {
        const accID = req.params.accID;
        const query = {_id: accID};
        const accUsername = req.body.accUsername;
        const userID = req.body.userID;
        const userUsername = req.body.userUsername;
        const userQuery = {_id: userID}

        User.findByIdAndUpdate(query, { $pull: { followers: {userID: userID, username:userUsername}} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                User.findByIdAndUpdate(userQuery, { $pull: { following: {userID: accID, username: accUsername}} }, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('back');
                    }
                })
            }
        })
          
    },

    loadFollowers: function(req, res) {
        const accID = req.params.accID;
        const query = {_id: accID};
        User.find(query,function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('followers', {
                    user: req.user,
                    user_profile: result[0]
                });
            }
        })
    },

    loadFollowing: function(req, res) {
        const accID = req.params.accID;
        const query = {_id: accID};
        User.find(query,function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('following', {
                    user: req.user,
                    user_profile: result[0]
                });
            }
        })
    }



}

export default UserProfile;