import College from "../models/collegesSchema.js";

const departments = {
    deptList: function(req, res){
        const collegeCode = req.params.collegeCode;

        College.find({college: collegeCode},function(err, result){
            if(err){
                console.log(err);
            }
            else{
                res.render('departments',{
                    colleges: result[0], 
                    user: req.user})
            }
        })
    }
}

export default departments;