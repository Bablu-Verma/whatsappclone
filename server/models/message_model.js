import mongoose from "mongoose";


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

}, { timestamps: true });

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel