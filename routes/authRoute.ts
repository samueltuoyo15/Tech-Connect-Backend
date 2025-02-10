import { Router } from "express"
import passport from "passport"
import { googleCallback, emailSignUp, emailSignIn, verifyEmail, forgotPassword, resetPassword, getCurrentUser, logout } from "../controllers/authController"
import { authenticateJWT } from "../middlewares/getCurrentUser"

const router = Router()

router.post("/signup", emailSignUp)
router.post("/signin", emailSignIn)
router.get("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.get("/me", authenticateJWT, getCurrentUser)
router.post("/logout", logout)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback)

export default router
