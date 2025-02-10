import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User, { UserInterface } from "../models/User"

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthenticatedRequest extends Request {
  user?: UserInterface
}

export const authenticateJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" })
  }
}
