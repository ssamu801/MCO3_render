import Prof from "../models/profSchema.js";
import College from "../models/collegesSchema.js";

var collegeDept
const profList = {
    profList: function(req, res){
        collegeDept = req.params.department;

        Prof.find({department: collegeDept},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('prof_list',{
                    user: req.user,
                    dept: collegeDept,
                    prof_profile: result,})
            }
        })
    },

    searchFilter: function(req, res){
        const search = req.body.search;
      
        Prof.find({ $and: [ {name: { $regex: search , $options: "i" }}, {department: collegeDept} ]},function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('prof_list',{
                    dept: collegeDept,
                    prof_profile: result,
                    user: req.user
                })
            }
        })
    }
}


export default profList;