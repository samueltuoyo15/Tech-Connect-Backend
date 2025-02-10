import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

const JWT_SECRET = process.env.JWT_SECRET as string

export const getCurrentUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.authToken
    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })

    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error fetching user data" })
  }
}
