import mongoose from "mongoose";
import moment from "moment/moment.js";

const channelsSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true 
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true 
    },
    reciverName:{
        type: String,
        require:true 
    },
    reciverProfile:{
        type: String, 
    },
    createChannels: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    }, 
}, { timestamps: true });

const channelsModel = mongoose.model('Channels', channelsSchema);

export default channelsModel