import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/User"
import dotenv from "dotenv"

dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/google/callback`,
      scope: ["profile", "email"]
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) return done(null, existingUser)

        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
          fullname: profile.name?.givenName + "" + profile.name?.familyName,
          email: profile.emails?.[0].value,
          isVerified: true,
          profilePicture: profile.photos?.[0].value
        })

        await newUser.save()
        done(null, newUser)
      } catch (error) {
        done(error, undefined)
      }
    }
  )
)

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, undefined)
  }
})

export default passport