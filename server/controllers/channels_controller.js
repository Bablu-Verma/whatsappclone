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

        console.log(typeof (sender_details._id))

        const find_channels = await channelsModel.findOne({ members: { $all: [sender_details._id, reciver_details._id] } })

        //  check channel is exit or not 

        if (find_channels) {
            return resp.status(501).send({
                status: 0,
                message: 'Your channel is already create this user',
                channel_create: 0,
                channel: find_channels
            })
        }

        // create new channel 
        const create_channels = channelsModel({ members: [sender_details._id, reciver_details._id], senderId:sender_details._id, reciverName: reciver_details.name, reciverProfile: reciver_details.profile, reciverEmail: reciver_details.email })

        const save_create_channels = await create_channels.save()
        return resp.status(200).send({
            status: 1,
            channel_create: 1,
            message: 'Channels Add Successfull',
            channels: save_create_channels
        });

    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }

}

export const ChannelList = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    
    try {
        const find_channels = await channelsModel.find({ senderId: decodedToken.id })
        console.log(find_channels)

        if(find_channels.length == 0){
            return resp.status(200).send({
                code:0,
                status: 1,
                message: 'No Channel found',
            });
        }
        return resp.status(200).send({
            status: 1,
            code:1,
            message: 'All Channel List',
            channel: find_channels
        });

    } catch (error) {
        return resp.status(500).send({
            code: 0,
            status: 0,
            message: 'server Error',
        });
    }
}

export const DeleteChannel = async (req, resp) => {
    // const authorization = req.headers['authorization'];
    const { channelId } = req.body
    try {
        const deletedChannel = await channelsModel.findByIdAndDelete(channelId);
        if (!deletedChannel) {
            return resp.status(404).send({
                delete: 0,
                status: 0,
                message: 'Channel not found',
            });
        }
        // console.log(deletedChannel)
        return resp.status(200).send({
            status: 1,
            delete: 1,
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