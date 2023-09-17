import mongoose from "mongoose";
import moment from "moment/moment.js";

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
    verify:{
      type:Boolean,
      default :false,
      required:true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    gander:{
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: 'I Am Using Chat Me'
    },
    profile: {
        type: String,
    },
    age: {
        type: Number,
    },
    createUser: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    },
    password:{
        type: String,
        required: true,
    },
    otp:{
        type: String,
        default:null
    },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel