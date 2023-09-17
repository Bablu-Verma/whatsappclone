import UserModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { sendOTPMiddleware } from "../middleware/verifyUser.js";
import { generateOTP } from "../config/small_function.js";


dotenv.config()
const secretKey = process.env.secretKey

export const UserList = async (req, resp) => {
    try {
        const user_list = await UserModel.find() 

        // console.log(user_list)
        const user_data = user_list.map( data => ({
            name:data.name,
            username:data.username,
            profile:data.profile
        }))

        resp.status(200).send({
            status: 1,
            message: 'User list',
            Userlist:user_data
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

}

export const UserDetails = async (req, resp) => {
    const authorization = req.headers['authorization'];

    try {
        const decodedToken = jwt.verify(authorization, secretKey);
        const user_details = await UserModel.findOne({email:decodedToken.email})
        resp.status(200).send({
            status: 1,
            message: 'User Details',
            user_details:user_details
        })
        
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

}

export const EditUserDetail = async (req, resp) => {

    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    console.log(req.body)
    const { name, description, age } = req.body

    const Profile = req.file?.filename || null
    
    try {
        //   validat input data 
        if (!name) {
            return resp.status(401).send({
                code: 0,
                status: 0,
                message: 'Enter Your Name',
            })
        }
        if (name.length <= 2) {
            return resp.status(401).send({
                code: 0,
                status: 0,
                message: 'Name should be minimum 3 characters',
            })
        }
       
        if (!age) {
            return resp.status(401).send({
                code: 0,
                status: 0,
                message: 'Enter Your Age',
            })
        }
        if (!(/^[0-9]+$/.test(age))) {
            return resp.status(401).send({
                code: 0,
                status: 0,
                message: 'Enter Your Valid Age ',
            })
        }

       
        //   update user in db 

        if(Profile === null){
            const user_details = await UserModel.findByIdAndUpdate({_id:decodedToken.id},{name, description, age},{ new: true })
            if (!user_details) {
            return resp.status(404).send({
                code: 0,
                status: 0,
                message: 'User Document Not Update Try Again ',
                });
          }

          resp.status(200).send({
            status: 1,
            message: 'Save User Details Successfull',
            user_details:user_details
        })

        }else{
            const user_details = await UserModel.findByIdAndUpdate({_id:decodedToken.id},{name, description, age, profile:Profile},{ new: true })
            if (!user_details) {
                return resp.status(404).send({
                    code: 0,
                    status: 0,
                    message: 'User Document Not Update Try Again ',
                    });
              }
              resp.status(200).send({
                status: 1,
                message: 'Save User Details Successfull',
                user_details:user_details
            })
    
        } 
      
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

}

export const EditUserProfile = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);
    
    const Profile = req.file?.filename || null
    
    try {
       
        if(Profile == null){
            resp.status(200).send({
                status: 1,
                message: 'Your Profile Not Save'
        })

        }else{
            const user_details = await UserModel.findByIdAndUpdate({_id:decodedToken.id},{ profile:Profile},{ new: true })
            if (!user_details) {
                return resp.status(404).send({
                    code: 0,
                    status: 0,
                    message: 'User Document Not Update Try Again ',
                    });
              }
              resp.status(200).send({
                status: 1,
                message: 'Your Profile Update Successfully',
                user_details:user_details
            })
    
        } 
      
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

}

export const ChangeUserPassword = async (req, resp) => {

    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    console.log(req.body)
    const { oldPassword, newPassword } = req.body

    if (!newPassword) {
        return resp.status(401).send({
            code: 0,
            status: 0,
            message: 'Enter New Password',
        })
    }
    if (newPassword.length <= 5) {
        return resp.status(401).send({
            code: 0,
            status: 0,
            message: 'Enter Strong Password, minimum 6 characters',
        })
    }
    
    try {
      
        const user_detail =  await UserModel.findOne({_id:decodedToken.id})

         const server_password = user_detail.password
         console.log(server_password)

         bcrypt.compare(oldPassword,server_password, async (err, result) =>{
            if(err){
                return resp.status(500).send({
                    status: 0,
                    message: 'Server Error, try again',
                    err
                })
            }
            if (result) {

                const salt = 10
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                 const update_password = await UserModel.findByIdAndUpdate({_id:decodedToken.id},{password:hashedPassword},{ new: true })
       
                resp.status(200).send({
                    status: 1,
                    message: 'Password Change Successfully',
                    user_details:{
                        email:update_password.email,
                        username:update_password.username
                    }
                })
            } else {
                resp.status(422).send({
                    status: 0,
                    code: 0,
                    message: 'Old Password Not Match try Again',
                })
            }
         })


      

      
      
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

}

export const DeleteAccountRequest = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);
    //  console.log(decodedToken)
    try {
        const find_user = await UserModel.findOne({ email: decodedToken.email })
        if (!find_user) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: 'User Not Register, register First',
            })
        }

        //  create otp 
        const user_OTP = generateOTP();

        await UserModel.findByIdAndUpdate({ _id: find_user._id }, { otp: user_OTP }, { new: true })
         
        // send  email 
        let text_data = 'Your Account Delete OTP is : '

        sendOTPMiddleware(find_user.email, user_OTP, text_data)

        //   genreate now time 
        const now_date = new Date();
        const now_time = now_date.getTime();
     
        // create jwt token 
        const user_data = {
            email: find_user.email,
            id: find_user._id,
            time: now_time
        }
        const token = jwt.sign(user_data, secretKey, { expiresIn: '1d' });
        return resp.status(200).send({
            code: 1,
            status: 1,
            message: 'Delete Account Accepeted, Check Your Email & Verify OTP',
            token
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteAccountVerifyOTP =  async (req, resp) =>{

    const { otp } = req.body

    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    if (!otp) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enetr OTP',
        })
    }
    if (!otp.length == 4) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'OTP should Be 4 Digit',
        })
    }

    try {
      
        const server_user = await UserModel.findOne({ _id: decodedToken.id })
        

        if (!server_user) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: 'User Not Exit',
            })
        }
       

        if (!(otp == server_user.otp)) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: 'OTP not Match, try anain',
            })
        }
        
        //   genreate now time 
        const now_date = new Date();
        const now_time = now_date.getTime();

        if (now_time - decodedToken.time > 1800000) {
            return resp.status(422).send({
                code: 0,
                status: 0,
                message: 'OTP Valid Only 30 Min, resend OTP',
            })
        }

       await UserModel.findByIdAndRemove(server_user._id)

        resp.status(200).send({
            status: 1,
            message: 'Delete Your Account Successfull',
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const searchUser = async (req, resp) => {
    const authorization = req.headers['authorization'];
    const decodedToken = jwt.verify(authorization, secretKey);

    const { search } = req.body

    try {
       const search_data =  await UserModel.find({
        $or:[
            {name:{'$regex':search,'$options':'i'}},
            {email:{'$regex':search,'$options':'i'}},
            {username:{'$regex':search,'$options':'i'}}
        ]
       })

       const user_data = search_data.map( data => ({
        name:data.name,
        username:data.username,
        profile:data.profile
        }))
    
        // filter array 
        const filteredArray = user_data.filter(
          (item) => item.username !== decodedToken.email
        );

       resp.status(200).send({
        status: 0,
        message: 'Your Search Now',
        search_data:filteredArray
    })
        
    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }

} 