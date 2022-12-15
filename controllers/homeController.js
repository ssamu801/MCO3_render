import College from "../models/collegesSchema.js";
import User from "../models/userSchema.js";
import Review from "../models/reviewSchema.js";

const home = {
    collegeList: function(req, res){
        College.find({},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render("home", {
                    colleges: result,
                    user: req.user
                    });
            }
        })
    }
}

export default home;