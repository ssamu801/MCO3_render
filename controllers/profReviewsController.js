import Prof from "../models/profSchema.js";
import Review from "../models/reviewSchema.js";

const profReviews = {
    load: function(req, res){
        const profID = req.params.profID;
        const course = req.params.course;
        var name;
        var test = [];

    Prof.find({_id: profID}, function(err, result){
        if(err){
            console.log(err);
        }
        else{           
                name = result[0].name;      
            
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

    Review.find({ $and: [ {prof_id: profID}, {course: course}]}, null, {sort: {_id: -1}}, function(err, rows){
        if(err){
            console.log(err);
        }
        else{

            res.render('prof_reviews',{
                reviews: rows,
                name:name,
                course: course,
                user: req.user,
                test:test
            })
        }
        
    });
    },

    incrementLikes: function(req, res){
        const reviewID = req.body.reviewID;
        const query = {_id: reviewID};
    
        Review.findOneAndUpdate(query, {$inc : { likes: 1 }}, function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.redirect('back');
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

    }
}

export default profReviews;