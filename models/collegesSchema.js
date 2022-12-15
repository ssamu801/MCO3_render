import mongoose from 'mongoose';

const collegeSchema = {
    college: String,
    name: String,
    departments: [String]
};

const College = mongoose.model("Colleges", collegeSchema);

export default College;