import { Request, Response } from "express"
import sendEmail from "../utils/sendVerificationEmail"
import User from "../models/User"
import signUpSchema from "../validators/authValidator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string 

export const googleAuthSignUp = async (req: Request, res: Response) => <Promise<any> {
  try{
  const user = req.user as any
  if(!user){
    res.status(400).json({"Google auth failed during the process"})
  }
  
  const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "7d"})
  res.status(200).json({token, user})
  } catch(error){
    res.status(500).json({message: "goofle authentication error"})
  }
}

export const emailSignUp = async (req: Request, res: Response): Promise<any> => {
  const {error} = signUpSchema.validate(req.body)
  if(error){
    return res.status(400).json({message: error.details[0].message})
  }
 
  const {fullname, username, email, password, gender} = req.body
  const existingUser = await User.findOne({email})
  if(existingUser) return res.status(400).json({message: "User already have an account please go to thr login screen "})
  
  const hashPassword = await bcrypt.hash(password, 10)
  
  const newUser = new User({
    fullname,
    username,
    email,
    password: hashPassword,
    gender,
    isVerified: false,
  })
  await newUser.save()
  
  const token = jwt.sign({email}, JWT_SECRET, {expiresIn: "1h"})
  await sendVerificationEmail(email, subject: "Verify Your Account", )
}
