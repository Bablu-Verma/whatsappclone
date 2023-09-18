import express from 'express'

import { checkLoginMiddleware } from '../middleware/checkUser.js'
import { AddMessage, DeleteMessage, ListMessage } from '../controllers/message_controller.js'
import { uploadUserImage } from '../config/uploadUserImage.js'



// rout object 
const message_route =  express.Router()

message_route.post('/add',checkLoginMiddleware,uploadUserImage.single("file"),AddMessage)
message_route.post('/message-list',checkLoginMiddleware,ListMessage)
message_route.post('/delete-message',checkLoginMiddleware,DeleteMessage)

export default message_route