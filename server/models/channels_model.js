import mongoose from "mongoose";


const channelsSchema = new mongoose.Schema({
    members:{
        type:Array,
        require:true 
    },
    senderId:{
        type:String,
        require:true 
    },
    reciverName:{
        type: String,
        require:true 
    },
    reciverEmail:{
        type: String,
        require:true 
    },
    lastMessage:{
        type: String,
    },
    reciverProfile:{
        type: String, 
    },
    
}, { timestamps: true });

const channelsModel = mongoose.model('Channels', channelsSchema);

export default channelsModel