import { Router } from "express";
//import flash from "connect-flash";

import authenticateUser from "../configs/authenticateUser.js";

import controller from "../controllers/controller.js";
import deptList from "../controllers/departmentsController.js";
import profList from "../controllers/profListController.js";
import profPage from "../controllers/profPageController.js";
import profReview from "../controllers/profReviewsController.js";
import adminPage from "../controllers/editProfController.js";
import mainSearch from "../controllers/mainSearchController.js";
import userProfile from "../controllers/userProfileController.js";


import home from "../controllers/homeController.js";
import registerCont from "../controllers/registerController.js";
import loginCont from "../controllers/loginController.js";

import settingsCont from "../controllers/settingController.js";


const router = Router();

//from controller.js
router.get('/', controller.getIndex);
router.get('/about', controller.getAbout);

//from departmentsController.js
router.get('/profList/:collegeCode',authenticateUser.ensureAuthentication ,deptList.deptList);

//from registerController.js
router.get('/register', registerCont.getRegister);
router.post('/register', registerCont.newUser);


//from loginController.js
router.get('/login', loginCont.getLogin);
router.post('/login', loginCont.userAuthenticate);

//from homeController.js
router.get('/home',authenticateUser.ensureAuthentication, home.collegeList);

//from profListController.js
router.get('/profList/:collegeCode/:department', authenticateUser.ensureAuthentication ,profList.profList);
router.post('/profResults/:collegeCode/:department',authenticateUser.ensureAuthentication, profList.searchFilter);

//from profPageController.js
router.get('/profPage/:profID', authenticateUser.ensureAuthentication, profPage.load);
router.post('/incrementLikes', profPage.incrementLikes);
router.post('/decrementLikes', profPage.decrementLikes);
router.post('/saveReview', profPage.saveReview);
router.post('/deletePost', profPage.deletePost);
router.get('/:profID/:userID/1', profPage.oneStar);
router.get('/:profID/:userID/2', profPage.twoStar);
router.get('/:profID/:userID/3', profPage.threeStar);
router.get('/:profID/:userID/4', profPage.fourStar);
router.get('/:profID/:userID/5', profPage.fiveStar);

//from profReviewsController
router.get('/profReviews/:profID/:course', authenticateUser.ensureAuthentication, profReview.load);
router.post('/incrementLikes', profReview.incrementLikes);

//from adminPageController
router.get('/adminPage',authenticateUser.ensureAuthentication, adminPage.load);
router.get('/addProfPage',authenticateUser.ensureAuthentication, adminPage.loadAddProf);
router.post('/addProf',authenticateUser.ensureAuthentication, adminPage.addProf);
router.get('/editProf',authenticateUser.ensureAuthentication, adminPage.loadEditProf);
router.get('/editSearch',authenticateUser.ensureAuthentication, adminPage.loadEditSearch);
router.post('/editSearch/results',authenticateUser.ensureAuthentication, adminPage.editSearchResults);
router.get('/editSearch/:profID',authenticateUser.ensureAuthentication, adminPage.loadEditProf);
router.post('/updateProf',authenticateUser.ensureAuthentication, adminPage.editProf);
router.get('/deleteProf',authenticateUser.ensureAuthentication, adminPage.loadDeleteProf);
router.post('/deleteSearch/results',authenticateUser.ensureAuthentication, adminPage.deleteSearchResults);
router.post('/removeProf',authenticateUser.ensureAuthentication, adminPage.deleteSearchResults);
router.get('/removeProf/:profID',authenticateUser.ensureAuthentication, adminPage.confirmDelete);
router.post('/delProf',authenticateUser.ensureAuthentication, adminPage.deleteProf);

//from mainSearchController
router.post('/search',authenticateUser.ensureAuthentication, mainSearch.searchResults);

//from userProfileController
router.get('/profile/:userID',authenticateUser.ensureAuthentication, userProfile.loadUserProfile);
router.post('/followUser/:accID',authenticateUser.ensureAuthentication, userProfile.incrementFollowers);
router.post('/unfollowUser/:accID',authenticateUser.ensureAuthentication, userProfile.decremnentFollowers); 
router.get('/profile/:accID/followers',authenticateUser.ensureAuthentication, userProfile.loadFollowers); 
router.get('/profile/:accID/following',authenticateUser.ensureAuthentication, userProfile.loadFollowing); 



router.get('/logout', function(req, res){
    req.logout( function(error){
        if(error){
            return next(error);
        }
        req.flash("success_msg", "Successfully logged out");
        res.redirect('/login')
    });
    
})

//Settings
router.get('/settings/:userID', authenticateUser.ensureAuthentication ,settingsCont.getSettings);
router.post('/updateUser/:userID', authenticateUser.ensureAuthentication ,settingsCont.updateInfo);

export default router;