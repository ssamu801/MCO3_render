import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "Please enter your email"
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    followers:{
        type: Array,
        "default" : []
    },
    following: {
        type: Array,
        "default" : []
    }
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

export default User;