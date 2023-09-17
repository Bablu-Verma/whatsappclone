import mongoose from "mongoose";
import moment from "moment/moment.js";

const MessageSchema = new mongoose.Schema({
    channelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channels',
        required:true 
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true 
    },
    message:{
        type :String ,
    },
    file:{
        type: String
    },
    create: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }, 

}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel