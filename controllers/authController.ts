import { Request, Response } from "express"
import sendEmail from "../utils/sendVerificationEmail"
import User from "../models/User"
import {signUpSchema, loginSchema} from "../validators/authValidator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string

export const googleCallback = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user as any
    if (!user) return res.status(400).json({ message: "Google auth failed during the process" })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })
      res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
  })
res.status(200).json({ message: "Google sign-in successful" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Google authentication error" })
  }
}

export const emailSignUp = async (req: Request, res: Response): Promise<any>  => {
  const { error } = signUpSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const { fullname, username, email, password, gender } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "User already has an account, please go to the login screen" })

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      isVerified: false
    })

    await newUser.save()

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" })
    const verificationLink = `${process.env.SERVER_URL}/verify-email?token=${token}`

    await sendEmail(email, "Verify Your Account", `Click here to verify: ${verificationLink}`)
    res.status(201).json({ message: "Signed up successfully. Please verify your email" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to sign up" })
  }
}

export const emailSignIn = async (req: Request, res: Response): Promise<any>  => {
  const { error } = loginSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const passwordMatch = await bcrypt.compare(password, user.password as string)
    if (!passwordMatch) return res.status(400).json({ message: "Invalid password. Please check and try again" })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 *1000,
    })
    res.cookie("userData", JSON.stringify({
      id: user?._id,
      email: user?.email,
      fullname: user?.fullname,
      username: user?.username,
      profile_picture: user?.profile_picture,
      gender: user?.gender,
      bio: user?.bio,
      address: user?.address,
      birthday: user?.birthday,
      locale: user?.locale,
      joined: user?.joined,
    }), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 *1000,
    })
    res.status(200).json({ message: "user signed successfully"})
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error signing in" })
  }
}

export const verifyEmail = async (req: Request, res: Response): Promise<any>  => {
  const { token } = req.query
  if (!token) return res.status(400).send("<h2>Missing token</h2>")

  try {
    const decoded: any = jwt.verify(token as string, JWT_SECRET)
    const user = await User.findOne({ email: decoded.email })
    if (!user) return res.status(400).send("<h2>User not found</h2>")
    if (user.isVerified) return res.status(400).send("<h2>User is already verified</h2>")

    user.isVerified = true
    await user.save()

    res.status(200).send("<h2>Email verified successfully</h2>")
  } catch (error) {
    console.error(error)
    res.status(500).send("<h2>Failed to verify user</h2>")
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<any>  => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" })
    const resetLink = `${process.env.SERVER_URL}/reset-password?token=${token}`

    await sendEmail(email, "Reset Your Password", `Click here to reset: ${resetLink}`)
    res.status(200).json({ message: "Password reset email sent" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error sending reset email" })
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<any>  => {
  try {
    const { token } = req.query
    const { newPassword } = req.body
    if (!token) return res.status(400).json({ message: "Missing token" })

    const decoded: any = jwt.verify(token as string, JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.status(200).json({ message: "Password reset successful" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error resetting password" })
  }
}

  
export const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("authToken", { secure: process.env.NODE_ENV === "production", sameSite: "strict" })
  res.clearCookie("userData", { secure: process.env.NODE_ENV === "production", sameSite: "strict" })
  res.status(200).json({ message: "Logged out successfully" })
}

export const deleteAccount = async (req: Request, res: Response) Promise<any> => {
  const {email} = req.params
  if(!email || email.trim().length <= 0){
    res.status(400).json({message: "please provide a valid email"})
  }
  
  const user = await User.findOneAndDelete({email})
  if(!user){
    res.status(400).json({message: "User doesn't exist"})
    return
  }
 
  res.clearCookie("authToken", { secure: process.env.NODE_ENV === "production", sameSite: "strict" })
  res.clearCookie("userData", { secure: process.env.NODE_ENV === "production", sameSite: "strict" })
  res.json({message: "User deleted successfully "})
}