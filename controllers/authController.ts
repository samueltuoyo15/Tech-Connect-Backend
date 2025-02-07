import { Request, Response } from "express";
import {User} from "../utils/type";
import passport from "passport";
import supabase from "../supabase/supabase";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Sign up with email and password
export const signUpWithEmailAndPassword = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password, gender }: { username: string; email: string; password: string; gender: string } = req.body;

  if (!gender || !username || !email || !password) {
    return res.status(400).json({ message: "Username, gender, password, and email must not be empty" });
  }

  if (typeof gender !== "string") {
    return res.status(400).json({ message: "Invalid gender format, it must be a string" });
  }
  if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string" || password.length > 20) {
    return res.status(400).json({ message: "Password must be a string and not greater than 20 characters" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({ message: "Password must be 6-20 characters long" });
  }
  if (username.length < 3 || username.length > 14) {
    return res.status(400).json({ message: "Username must be 3-14 characters long" });
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to sign up" });
    }

    const { error: dbError } = await supabase.from("users").insert({
      id: data.user?.id,
      email,
      bio: "",
      profile_picture: "",
      username: username,
      gender: gender,
    });

    if (dbError) {
      console.error(dbError);
      return res.status(500).json({ message: "Error saving new user to database" });
    }

    return res.status(200).json({ message: "Successfully signed up", user: data?.user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred in the server" });
  }
};

// Sign out
export const signOut = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error occurred when signing out" });
    }

    return res.status(200).json({ message: "Successfully signed out" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Error occurred when signing out" });
  }
};

// Get Google authenticated user
const JWT_SECRET = process.env.JWT_SECRET as string;
export const getAuthUser = async (req: Request, res: Response): Promise<any> => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
    return res.json({ authenticated: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Google logout
export const googleLogout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("auth_token");
  return res.json({ message: "Logged out successfully" });
};

// Google callback authentication
export const googleCallbackAuth = [
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User;

    if (!user) {
      return res.redirect("http://localhost:5173/login");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  }
];
