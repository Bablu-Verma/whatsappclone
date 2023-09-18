import nodemailer from 'nodemailer'



export const sendOTPMiddleware = async (user_email, otp_number, text_data) =>{
// send otp email 
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'douglas.price@ethereal.email',
    pass: 'Zw6XX6kCxwUqjC2QN2'
  }
});

let mailOptions = {
  from: 'chatme.team@gmail.com',
  to: user_email,
  subject: 'Forgot Password OTP',
  text: `${text_data}
  
      ${otp_number}
      `
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
      //   console.log(error);
  } else {
      //   console.log('Email sent: %s ' + info.messageId);
  }
});
}

 