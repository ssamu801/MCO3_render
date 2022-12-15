import {Strategy as LocalStrategy} from "passport-local";
import user from "../models/userSchema.js";
import bcrypt from "bcrypt";

function passportMiddle(passport) {
    passport.use( "local", new LocalStrategy({ usernameField: "email"},
    function (email, password, done) {

        user.findOne({email: email}).then(function(user) {
            if(!user){
                return done(null, false, {message: "email is not found."});
            }
            
                bcrypt.compare(password, user.password, function(error, match){
                    if(error){
                        throw error;
                    }

                    if(match){
                        console.log(user);
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message: "wrong password"});
                    }
                });
           
        })
        .catch(error => console.log(error));
    }));

    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function (userid, done){
        user.findById(userid, function(error, user){
            done(error, user);
        });
    });



}

export default passportMiddle;