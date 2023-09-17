import dotenv from 'dotenv'
import express from 'express'
import  color  from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from "./config/connectDB.js"
import auth_route from "./routes/auth_route.js"
import user_route from './routes/user_route.js'
import channels_route from './routes/channels_route.js'
import message_route from './routes/message_route.js'

// create object 
const app = express()

// env config 
dotenv.config()

// variables 
const PORT = process.env.PORT || 8000
const HOST = process.env.HOST_URL

// static files
app.use(express.static('public'));

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors())


// call db 
connectDB(HOST)


// define routes 
app.get('/',(req, resp)=>{
    resp.send('App Is Working')
})

app.use("/api/v1/auth",auth_route)
app.use("/api/v1/user",user_route)
app.use("/api/v1/channels",channels_route)
app.use("/api/v1/message",message_route)

// app listen 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`.bgCyan)
})