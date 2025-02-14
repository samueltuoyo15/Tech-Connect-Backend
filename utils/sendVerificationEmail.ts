import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const sendEmail = async (email: string, subject: string, text: string) => {
  if(!email || !subject || !text) return "please subject, text and email must not be empty"
 
  try{
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER!,
      pass: process.env.GMAIL_PASS!,
    },
  })
  
  await transporter.sendMail({
    from: `Tech Connect ${process.env.GMAIL_USER!}`,
    to: email,
    subject,
    text,
  })
 }catch(error){
    console.error("error sending email", error)
  }
}

export sendEmail