import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
// import channelsModel from '../models/channels_model.js'
import MessageModel from "../models/message_model.js"
import channelsModel from "../models/channels_model.js"

dotenv.config()
const secretKey = process.env.secretKey

export const AddMessage = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    // console.log(decodedToken)
    const { message, channelId } = req.body
 
    const file = req.file?.filename || null

    try {
        if(file === null){
            const saveMessage = MessageModel({ message,channelId,senderId:decodedToken.id });
            const save_message = await saveMessage.save()
            await channelsModel.findByIdAndUpdate(channelId,{lastMessage:message},{new:true})
            return resp.status(200).send({
                status: 1,
                message: 'message sent',
                save_message:save_message
            });
        }else{
            const saveMessage = MessageModel({ message,channelId,file,senderId:decodedToken.id });
            const save_message = await saveMessage.save()
            await channelsModel.findByIdAndUpdate(channelId,{lastMessage:'Document'},{new:true})
            return resp.status(200).send({
                status: 1,
                message: 'message sent',
                save_message:save_message
            });
        }
        
    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}

export const ListMessage = async (req, resp) => {
    const {channelId} = req.body 
    try { 
        const find_message = await MessageModel.find({channelId:channelId})
        // console.log(find_message)
        return resp.status(200).send({
            status: 1,
            message: 'All Message',
            all_message:find_message
        });
        
    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}

export const DeleteMessage = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const {messageId} = req.body 

    try { 
        const find_message = await MessageModel.findOne({_id:messageId})
        if (!find_message) {
            return resp.status(404).send({
                code: 0,
                status: 0,
                message: 'message Not Found',
            })
        }
        if(find_message.senderId != decodedToken.id) {
            return resp.status(404).send({
                code: 0,
                status: 0,
                message: 'dont access to Delete This message',
            })
        }
        
        const delete_message = await MessageModel.findByIdAndRemove(find_message._id)

        return resp.status(200).send({
            status: 1,
            message: 'delete message',
            all_message:delete_message
        });
        
    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}