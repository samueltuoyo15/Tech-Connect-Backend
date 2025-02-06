import { Router, Request, Response } from "express";
import signUpWithEmailAndPassword from "../controllers/authController";
import passport from "../passport/passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router()

const JWT_SECRET = process.env.JWT_SECRET as string;

router.post("/signup", signUpWithEmailAndPassword);
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req: Request, res: Response) => {
    if (!req.user) {
      return res.redirect("http://localhost:5173/login"); 
    }
   
    const token = jwt.sign(
      { userId: req.user?.id, email: req.user?.email },
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
);

router.get("/auth/me", (req: Request, res: Response) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("auth_token"); 
  res.json({ message: "Logged out successfully" });
});

export default router;
