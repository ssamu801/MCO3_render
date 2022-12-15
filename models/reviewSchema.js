import mongoose from 'mongoose';

const reviewsSchema = {
    userID: String,
    username: String,
    reviewContent: String,
    course: String,
    likes: 0,
    prof: String,
    prof_id: String,
    likedBy_userID: [
        {
            userID: String
        }
    ]
};

const Review = mongoose.model("Review", reviewsSchema);

export default Review;