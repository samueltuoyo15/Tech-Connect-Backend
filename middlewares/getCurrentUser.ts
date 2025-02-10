import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User  from "../models/User"

const JWT_SECRET = process.env.JWT_SECRET as string


export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return next(new Error("Unauthorized"))

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return next(new Error("User not found"))

    req.user = user
    next()
  } catch (error) {
    next(new Error("Invalid token"))
  }
}
