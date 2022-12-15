import Prof from "../models/profSchema.js";
import User from "../models/userSchema.js";
import Review from "../models/reviewSchema.js";

const mainSearch = {
    searchResults: function(req, res){
        const search = req.body.search;
        const searchUpperCase = search.toUpperCase();

        Prof.find({ $and: [ {name: { $regex: search , $options: "i" }} ]},function(err, profs){
            if(err){
                console.log(err);
            }
            else{
                Prof.find({"courses": searchUpperCase}, function(err, prof_courses){
                    if(err){
                        console.log(err);
                    }
                    else{
                        User.find({ $and: [ {username: { $regex: search , $options: "i" }} ]},function(err, users){
                            if(err){
                                console.log(err);
                            }
                            else{
                                res.render('mainSearch',{
                                    prof_profile: profs,
                                    user: req.user,
                                    search: search,
                                    prof_courses: prof_courses,
                                    users: users
                                })
                            }
                        })
                        
                    }  
                    
                })
            }
        })
    }
}

export default mainSearch;