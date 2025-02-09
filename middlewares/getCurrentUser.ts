import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthenticatedRequest extends Request {
  user?: UserInterface
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }
    req.user = { _id: decoded.id } as UserInterface  
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" })
  }
}
