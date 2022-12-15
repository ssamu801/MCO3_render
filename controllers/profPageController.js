import Prof from "../models/profSchema.js";
import Review from "../models/reviewSchema.js";
import mongoose from 'mongoose';
import authenticateUser from "../configs/authenticateUser.js";

const profPage = {
    load: function(req, res){
        const profID = req.params.profID;
        var dbreviews = [];
        var isRated = 1;
        var sum = [];
        var test = [];

        Review.find({prof_id: profID}, null, {sort: {likes: -1}}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                rows.forEach(function(reviews){
                    dbreviews.push({
                        username: reviews.username,
                        id: reviews._id,
                        reviewContent: reviews.reviewContent,
                        course: reviews.course,
                        likes: reviews.likes,
                        prof: reviews.prof,
                        prof_id: reviews.prof_id})
                });
            }
        
        });

        Prof.aggregate( [{'$match': {'_id': mongoose.Types.ObjectId(profID)}}, {'$unwind': {'path': '$rated_userID'}}, {'$group': {'_id': '$_id', 'sum_val': {'$sum': '$rated_userID.rating'}}}], function(err,rows){
            if(err){
                console.log(err);
            }
            else{
                rows.forEach(function(result){
                    sum.push({
                        id: result._id,
                        sum_val: result.sum_val})
                });
            }
        })

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



        Prof.find({_id: profID}, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                Review.find({prof_id: profID}, null, {sort: {_id: -1}}, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Prof.find({_id: profID}, {'rated_userID': {$elemMatch: {userID:req.user.id}}}, function(err, rating){
                            if(err){
                                console.log(err);
                            }
                            else{
                                if(rating[0].rated_userID.length == 0){
                                    isRated = 0;
                                }
                                res.render('prof_page',{
                                    user: req.user,
                                    dbreviews: dbreviews,
                                    reviews: rows,
                                    prof_profile: result[0],
                                    user_rating: rating[0].rated_userID[0],
                                    isRated: isRated,
                                    sum: sum[0],
                                    test: test
                                })
                                
                            }  
                            
                        })
                
                    }   
                
                })
            }
        })
    },

    incrementLikes: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
        const userID = { userID: req.user.id};
    
        Review.findOneAndUpdate(query, {$inc : { likes: 1 }}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                Review.findByIdAndUpdate(query, { $push: { likedBy_userID: userID} }, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('back');
                    }
                })
            }
            
        });

    },

    decrementLikes: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
        const userID = { userID: req.user.id};
    
        Review.findOneAndUpdate(query, {$inc : { likes: -1 }}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                Review.findByIdAndUpdate(query, { $pull: { likedBy_userID: userID} }, function(err, rows){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect('back');
                    }
                })
            }
            
        });

    },
    
    deletePost: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
    
        Review.deleteOne(query, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
            
        });
    },

    saveReview: function(req, res){
        const review = new Review({
            userID: req.user.id,
            username: req.user.username,
            reviewContent: req.body.reviewContent,
            course: req.body.course_dropdown,
            likes: 0,
            prof: req.body.prof_name,
            prof_id: req.body.profID, 
        });

        
        review.save(function(err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        });
    },

    oneStar: function(req, res){
        const profID = req.params.profID;
        const query = {_id: profID};
        const userID = req.user.id;
        const userRating = { userID: userID, rating: 1 };

        Prof.findByIdAndUpdate(query, { $push: { rated_userID: userRating} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        })
        
    },

    twoStar: function(req, res){
        const profID = req.params.profID;
        const query = {_id: profID};
        const userID = req.user.id;
        const userRating = { userID: userID, rating: 2 };

        Prof.findByIdAndUpdate(query, { $push: { rated_userID: userRating} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        })
        
    },

    threeStar: function(req, res){
        const profID = req.params.profID;
        const query = {_id: profID};
        const userID = req.user.id;
        const userRating = { userID: userID, rating: 3 };

        Prof.findByIdAndUpdate(query, { $push: { rated_userID: userRating} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        })
        
    },

    fourStar: function(req, res){
        const profID = req.params.profID;
        const query = {_id: profID};
        const userID = req.user.id;
        const userRating = { userID: userID, rating: 4 };

        Prof.findByIdAndUpdate(query, { $push: { rated_userID: userRating} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        })
        
    },

    fiveStar: function(req, res){
        const profID = req.params.profID;
        const query = {_id: profID};
        const userID = req.user.id;
        const userRating = { userID: userID, rating: 5 };

       // User.findByIdAndUpdate(id, { $push: { createdEvents: eventId } })
        Prof.findByIdAndUpdate(query, { $push: { rated_userID: userRating} }, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
            }
        })
        
    }


}

export default profPage;