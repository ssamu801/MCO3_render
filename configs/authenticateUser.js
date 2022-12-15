const authenticateUser = {
    ensureAuthentication: function(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login again');
        console.log("login again")
        res.redirect('/login');    //test
    },

    fowardUser: function(req, res, response){
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/home');
    }
};

export default authenticateUser;