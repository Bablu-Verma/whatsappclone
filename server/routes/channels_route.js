import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { AddChannels, ChannelList, DeleteChannel } from '../controllers/channels_controller.js'


// rout object 
const channels_route =  express.Router()

channels_route.post('/add',checkLoginMiddleware, AddChannels)
channels_route.get('/channel-list',checkLoginMiddleware, ChannelList)
channels_route.delete('/delete-channel',checkLoginMiddleware, DeleteChannel)

export default channels_route