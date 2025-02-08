import { Request, Response } from "express"
import sendEmail from "../utils/type"
import passport from "../passport/passport"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string 

export const signUpWithEmail = async (req: Request, res: Response) => <Promise<any> {
  
}