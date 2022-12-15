import { Int32 } from 'mongodb';
import mongoose from 'mongoose';

const profProfileSchema = {
    name: String,
    courses: [String],
    college: String,
    department: String,
    averageRating: 0,
    courses_name: [String],
    rated_userID:[
        {
            userID: String,
            rating: Number
        }
    ]
};

const Prof = mongoose.model("prof_profile", profProfileSchema);

export default Prof;
