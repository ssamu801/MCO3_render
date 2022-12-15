import User from "../models/userSchema.js";
import db from "../models/db.js";
import bcrypt from "bcrypt";
import Review from "../models/reviewSchema.js";
import * as EmailValidator from 'email-validator';


const settingsCont = {
    getSettings: function(req, res) {
        var wrongPass = 0;
        var diffPass = 0;
        var isValidEmail = 1;
        res.render('settings',{
            user: req.user,
            wrongPass: wrongPass,
            diffPass: diffPass,
            isValidEmail
        });
    },

    updateInfo: async function(req, res) {
        var wrongPass = 0;
        var diffPass = 0;
        var isValidEmail = 1;
        const userID = req.params.userID;
        const query = {_id: userID};
        const samePassword = bcrypt.compare(req.body.password, req.body.passwordHash);
        const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

            //if new password and confirmed passwords are the same
            if(req.body.new_password == req.body.confirm_password){
                //if password is not changed
                if(req.body.new_password == ""){
                    if(samePassword){ //if password entered is correct
                        if(EmailValidator.validate(req.body.email)){
                            Review.updateMany({"username": req.user.username},{$set:{"username": req.body.username}}, function(err, rows){
                            if(err){
                                res.send(err)
                            }
                            else{
                                User.findOneAndUpdate(query, {"username": req.body.username, "email": req.body.email}, {new: true, upsert: true}, function(err, result){
                                    if(err){
                                        res.send(err)
                                    }
                                    else{
                                        res.render('settings',{
                                            user: result,
                                            wrongPass: wrongPass,
                                            diffPass: diffPass,
                                            isValidEmail
                        
                                            });
                                    }
                        
                                })
                            }
                        })
                        } else{ //invalid email
                            isValidEmail = 0;
                            res.render('settings',{
                                user: req.user,
                                wrongPass: wrongPass,
                                diffPass: diffPass,
                                isValidEmail
            
                                });
                        }
                    
                    }
                    //if wrong password
                    else{
                        wrongPass = 1;
                        res.render('settings',{
                            user: req.user, 
                            wrongPass: wrongPass,
                            diffPass: diffPass,
                            isValidEmail
                            });
                        }
    
                }
                else{ //if password is changed
                    if(samePassword){
                        Review.updateMany({"username": req.user.username},{$set:{"username": req.body.username}}, function(err, rows){
                            if(err){
                                res.send(err)
                            }
                            else{
                                User.findOneAndUpdate(query, {"username": req.body.username, "email": req.body.email, "password": hashedPassword}, {new: true, upsert: true}, function(err, result){
                                    
                                    if(err){
                                        res.send(err)
                                    }
                                    else{
                                        res.render('settings',{
                                            user: result,
                                            wrongPass: wrongPass,
                                            diffPass: diffPass,
                                            isValidEmail
                        
                                            });
                                    }
                        
                                })
                            }
                        })
                    }
                    //if wrong password
                    else{
                        wrongPass = 1;
                        res.render('settings',{
                            user: req.user, 
                           wrongPass: wrongPass,
                            diffPass: diffPass,
                            isValidEmail
                            });
                    }
                }
            }   
            else{ //if new password and confirm password are not the same
                diffPass = 1;
                res.render('settings',{
                    user: req.user, 
                    wrongPass: wrongPass,
                    diffPass: diffPass,
                    isValidEmail
                    });
        }
    
    
    }

}

export default settingsCont;