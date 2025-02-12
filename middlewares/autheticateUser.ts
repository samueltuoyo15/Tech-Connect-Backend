import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthRequest extends Request {
  user?: any
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.authToken || req.headers.authorization?.split(" ")[1]

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" })
      return;
    }

    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id)
    
    if (!user) {
      res.status(403).json({ message: "Invalid or expired token" })
      return;
    }

    req.user = user
    next()
  } catch (error) {
    console.error("Error in authentication:", error)
    res.status(500).json({ message: "Server error during authentication" })
  }
}