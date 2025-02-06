import {Router, Request, Response} from "express";
import passport from "../passport/passport";
import {signUpWithEmailAndPassword, signUpWithGoogle} from "../controllers/authController";
const router = Router();

router.post("/signup", signUpWithEmailAndPassword);
router.get("/auth/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req: Request, res: Response) => {
    const user = req.user;
    res.json({ message: "Google authentication successful", user: req.user });
    res.redirect("http://localhost:5173/")
  }
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err:any) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

export default router;