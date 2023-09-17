import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
// import channelsModel from '../models/channels_model.js'
import MessageModel from "../models/message_model.js"

dotenv.config()
const secretKey = process.env.secretKey



export const AddMessage = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    // console.log(decodedToken)
    const { message, channelId } = req.body
 
    const file = req.file?.filename || null

    try {
        const saveMessage = MessageModel({ message,channelId,file,senderId:decodedToken.id });

        const save_message = await saveMessage.save()
        return resp.status(200).send({
            status: 1,
            message: 'message sent',
            save_message:save_message
        });
        
    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}

export const ListMessage = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const {channelId} = req.body
    
    try {
        
        const find_message = await MessageModel.find({channelId:channelId})
        console.log(find_message)

        const message_list = find_message.map((data)=>({
            message:data.message,
            file:data.file,
            create:data.create,
            id:data._id
        }))

        return resp.status(200).send({
            status: 1,
            message: 'All Message',
            all_message:message_list
        });
        
    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}