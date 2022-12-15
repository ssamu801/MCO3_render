import Prof from "../models/profSchema.js";
import College from "../models/collegesSchema.js";

const adminPage = {
    load: function(req, res){  
        res.render('adminPage',{
            user: req.user
        })
    },

    loadAddProf: function(req, res){  
        var isEqual = 1;
        College.find({},function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.render('addProf',{
                    colleges: rows, 
                    user: req.user,
                    isEqual})
            }
        })   
    },

    addProf: function(req, res){  

        var couresHolder = [];
        var couresNameHolder = [];
        var isEqual = 1;
        var len = Number (req.body.courses.length)
        var len2 = Number (req.body.courses_name.length)
        
        if(len == len2){
            for(let i = 0; i < len; i++){
                couresHolder.push(req.body.courses[i]);
                couresNameHolder.push(req.body.courses_name[i]);
            }

            const prof = new Prof({
                name: req.body.name,
                courses: couresHolder,
                college: req.body.college,
                department: req.body.department,
                courses_name: couresNameHolder
            });

        
            prof.save(function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Prof successfully added");
                    res.redirect('adminPage');
                }
            });
        } else {
            isEqual = 0;
            College.find({},function(err, rows){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('addProf',{
                        colleges: rows, 
                        user: req.user,
                        isEqual})
                }
            })   
        }
    },

    loadEditProf: function(req, res){  
        const profID = req.params.profID;
        var isEqual = 1;

        College.find({},function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                Prof.find({_id: profID}, function(err, result){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render('editProf',{
                            colleges: rows,
                            prof_profile: result[0],
                            user: req.user,
                            isEqual})
                    }
                
                });
            }
        })        
    },

    loadEditSearch: function(req, res){  
        var load = 1;
        College.find({},function(err, rows){
            if(err){
                console.log(err);
            }
            else{
                res.render('editSearch',{
                    colleges: rows,
                    load: load,
                    user: req.user})
            }
        })        
    },

    editSearchResults: function(req, res){  
        var load = 0;
        const search = req.body.search;
        
        Prof.find({ $and: [ {name: { $regex: search , $options: "i" }}]},function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('editSearch',{
                    prof_profile: result,
                    load: load,
                    user: req.user
                })
            }
        })    
    },

    editProf: function(req, res){  
        var isEqual = 1;
        const profID = req.body.profID;
        const query = {_id: profID};
        const search = req.body.search;
        var len = Number (req.body.courses.length)
        var len2 = Number (req.body.courses_name.length)

        if(len == len2){        
        Prof.updateOne(query, { "$set": { "courses": [] , "courses_name": []}}, function(err, rows){

            if(err){
                res.send(err)
            }
            else{
                Prof.updateOne(query, { "$push": { "courses": req.body.courses , "courses_name": req.body.courses_name}}, function(err, results){

                    if(err){
                        res.send(err)
                    }
                    else{
                        Prof.findOneAndUpdate(query, {"name": req.body.name, "college": req.body.college, "department": req.body.department}, function(err, result){

                            if(err){
                                res.send(err)
                            }
                            else{
                                res.redirect("adminPage")
                            }
                    
                        })
                    }
            
                })
            }
    
            })
        }
        else{
            isEqual = 0;
            College.find({},function(err, rows){
                if(err){
                    console.log(err);
                }
                else{
                    Prof.find({_id: profID}, function(err, result){
                        if(err){
                            console.log(err);
                        }
                        else{
                            res.render('editProf',{
                                colleges: rows,
                                prof_profile: result[0],
                                user: req.user,
                                isEqual})
                        }
                    
                    });
                }
            })    
        }
        
    },

    loadDeleteProf: function(req, res){  
        var load = 1;
        
        res.render('deleteProf',{
            load: load,
            user: req.user
        })
                
    },

    deleteSearchResults: function(req, res){  
        var load = 0;
        const search = req.body.search;
        
        Prof.find({ $and: [ {name: { $regex: search , $options: "i" }}]},function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('deleteProf',{
                    prof_profile: result,
                    load: load,
                    user: req.user
                })
            }
        })    
    },

    confirmDelete: function(req, res){  
        const profID = req.params.profID;
        const query = {_id: profID};
        
        Prof.find(query,function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('confirmDelete',{
                    prof_profile: result[0],
                    user: req.user
                })
            }
        })    
    },


    deleteProf: function(req, res){  
        var load = 1;
        const profID = req.body.profID;
        const query = {_id: profID};
        const search = req.body.search;
        
        Prof.deleteOne(query,function(err, result){
            if(err){
                console.log(err);
            }
            else{
               
                res.render('adminPage',{
                    load: load,
                    user: req.user
                })
            }
        })    
    }
}

export default adminPage;