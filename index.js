import "dotenv/config";

import express from "express";
import db from "./models/db.js";
import routes from "./routes/routes.js";

import path from 'path';
import { fileURLToPath } from "url";

import passport from "passport";
import flash from "connect-flash";
import session from "express-session";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();


app.set("view engine", "ejs");
//app.set("views", "./views");

// To access css files
app.use(express.static(__dirname + '/public'));

// So you can use of req.body; body parser
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

db.connect();

//for user sessions
app.use(cookieParser());

//express sessions
app.use(session({
    secret: "hatdog",
    resave: true,
    saveUninitialized: true,
    //rolling: true,
    cookie: {
        httpOnly: true,
        secure: false
      }
}));

// initialize passport session
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash
app.use(flash());

// to enable "local" LocalStrategy
import passportConfig from './configs/passport.js'
passportConfig(passport);

//Flash global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

app.use(`/`, routes);

app.listen(port, function () {
    console.log(`App running at: `);
    console.log(`http://localhost:` + port);
})