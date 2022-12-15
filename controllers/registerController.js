import db from '../models/db.js';
import User from '../models/userSchema.js';
import bcrypt from "bcrypt";
import * as EmailValidator from 'email-validator';

import mongoose from "mongoose";

const registerController = {
    getRegister: function(req, res){
        var usernameExists = 0;
        var emailExists = 0;
        var isValid = 1;
        res.render('register', {
            usernameExists: usernameExists,
            emailExists: emailExists,
            isValid
        });
    },

    newUser: async function(req, res){
        var usernameExists = 0;
        var emailExists = 0;
        var isValid = 1;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        User.find({username: req.body.username}, function(err, result){
            if(err){
                console.log(err);
            }
            else{           
                if(result.length != 0){
                    usernameExists = 1; //username is already used
                } 

                User.find({email: req.body.email}, function(err, row){
                    if(err){
                        console.log(err);
                    }
                    else{           
                        if(row.length != 0){
                            emailExists = 1; //email is already used
                        }

                        if(EmailValidator.validate(req.body.email)){
                            //if both username and email is available
                            if(usernameExists == 0 && emailExists == 0){
                                const newUser = new User( {
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: hashedPassword,
                                }); 
                                db.createUser(User, newUser, function(result){
                                    if(result){
                                        newUser.save( function(err) {
                                            if(err){
                                                console.log(err);
                                            }
                                            else{
                                                console.log("User Registered");
                                                req.flash("success_msg", "User Registered");
                                                res.redirect('/login');
                                            }
                                        })
                            
                                }           
                                })
                            }
                            else{
                                res.render('register', {
                                    usernameExists: usernameExists,
                                    emailExists: emailExists,
                                    isValid
                                });
                            }    
                        }
                        else{
                            isValid = 0;
                            res.render('register', {
                                usernameExists: usernameExists,
                                emailExists: emailExists,
                                isValid
                            });
                        }    
                            
                    }
                })
                    
                
            }
        })

    },

    findUser: function(req, res){
        db.findOne(User, {email: req.query.email}, {}, (result) =>{
            if(result){
                res.send(true);
            }
            else{
                res.send(false);
            }
        })
    }
}

export default registerController;