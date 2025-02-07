import {Router} from "express";
import {signUpWithEmailAndPassword, signOut, getAuthUser, googleLogout, googleCallbackAuth} from "../controllers/authController";
import passport from "../passport/passport";

const router = Router();
router.post("/signup", signUpWithEmailAndPassword);
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", googleCallbackAuth);
router.get("/auth/me", getAuthUser);
router.get("/logout", googleLogout);
router.get("/signOut", signOut);

export default router;