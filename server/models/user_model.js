import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gander:{
        type: String,
        enum: ['male', 'female', 'other'], 
    },
    age: {
        type: Number,
    },
    about: {
        type: String,
        default: 'I Am Using Chat Me'
    },
    profile: {
        type: String,
        default: 'https://assets-prod.sumo.prod.webservices.mozgcp.net/static/default-FFA-avatar.2f8c2a0592bda1c5.png'
    },
    otp:{
        type: String,
        default: null
    },

}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel