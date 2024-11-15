import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        min: 6,
        require: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        require: true
    },
    profilePic: {
        type: String,
        default: ''
    }
});

const User = mongoose.model("User", userSchema);

export default User;