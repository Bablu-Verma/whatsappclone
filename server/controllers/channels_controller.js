import UserModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import channelsModel from '../models/channels_model.js'

dotenv.config()

const secretKey = process.env.secretKey

export const AddChannels = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const { reciverEmail } = req.body

    if (!reciverEmail) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Reciver Email',
        })
    }
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(reciverEmail))) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Reciver Email',
        })
    }

    try {
        const sender_details = await UserModel.findOne({ _id: decodedToken.id })
        const reciver_details = await UserModel.findOne({ email: reciverEmail })

        // console.log("reciverEmail, ", reciver_details)
        // console.log("sender_details, ", sender_details)
        const find_channels = await channelsModel.find({senderId:decodedToken.id})         

        //  check channel is exit or not 
         const isReceiverInAnyChannel = find_channels.some(channel => channel.reciverId.toString() === reciver_details._id.toString());

          if(isReceiverInAnyChannel === true){
            return resp.status(501).send({
                status: 0,
                message:'Your channel is already create this user',
                channel_create:0
            })
          }

        // create new channel 
        const create_channels = channelsModel({ senderId: decodedToken.id, reciverId: reciver_details._id,reciverName:reciver_details.name,reciverProfile: reciver_details.profile })
        const save_create_channels = await create_channels.save()

        return resp.status(200).send({
            status: 1,
            channel_create:1,
            message: 'Channels Add Successfull',
            channels :save_create_channels
        });

    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }

}

export const ChannelList = async(req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    try {
        const find_channels = await channelsModel.find({senderId:decodedToken.id})         

        const resciver_data = find_channels.map( (data) => ({
            name:data.reciverName,
            profile:data.reciverProfile,
            create:data.createChannels,
            id:data._id
        }))

        return resp.status(200).send({
            status: 1,
            message: 'All Channel List',
            channel:resciver_data
        });

    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}

export const DeleteChannel = async(req, resp) => {
    // const authorization = req.headers['authorization'];
    const {channelId} = req.body
    try {

        const deletedChannel = await channelsModel.findByIdAndDelete(channelId);
        if (!deletedChannel) {
          return resp.status(404).send({
            delete:0,
            status: 0,
            message: 'Channel not found',
          });
        }
        console.log(deletedChannel)
        return resp.status(200).send({
            status: 1,
            delete:1,
            message: 'delete channel sucessfull',
            deletedChannel  
        });

    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}