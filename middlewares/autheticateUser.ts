import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

interface AuthRequest extends Request {
  user?: any
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}
