import { Request, Response } from "express"
import sendEmail from "../utils/type"
import passport from "../passport/passport"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

