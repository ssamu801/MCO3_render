import db from "../models/db.js";


const controller = {

    getIndex: function(req, res) {
        var usernameExists = 0;
        var emailExists = 0;
        var isValid = 1;
        res.render('register', {
            usernameExists: usernameExists,
            emailExists: emailExists,
            isValid
        });
    },
    
    getAbout: function(req, res) {
        res.render('about', {
            user: req.user
        });
    }
}

export default controller;