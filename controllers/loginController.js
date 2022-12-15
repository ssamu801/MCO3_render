//import passportMiddle from "../configs/passport.js";
import passport from "passport";

const loginController = {
    getLogin: function(req, res){
        var logErr = 0;
        res.render('login', { logErr: logErr })
    },

    userAuthenticate: function(req, res, next){
        var logErr = 0;
        console.log("passport authenticating")
        passport.authenticate('local', function(err, user, info) {
            if (err) { 
              return next(err) 
              }
            if (!user) {
              logErr = 1;
              return res.render('login', { 
                logErr: logErr 
            })
            }
            req.logIn(user, function(err) {
              if (err) {
                 return next(err);
                 } 
                 if(user.role == "admin"){
                  return res.render('adminPage',{
                    user:user
                  });
                 }
                 else{
              return res.redirect('home');
                 }
            });
          })(req, res, next);
    },

};

export default loginController;