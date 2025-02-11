import { Router } from "express"
import passport from "passport"
import { googleCallback, emailSignUp, emailSignIn, verifyEmail, forgotPassword, resetPassword, logout } from "../controllers/authController"
import {verifyUser} from "../middlewares/getCurrentUser"

const router = Router()

router.post("/signup", emailSignUp)
router.post("/signin", emailSignIn)
router.get("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/logout", logout)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback)

export default router
