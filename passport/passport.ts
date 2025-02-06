import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import supabase from "../supabase/supabase"; 
import dotenv from "dotenv";
dotenv.config();

interface User {
  id: string;
  email: string;
  username: string;
  profile_picture?: string;
  gender: string;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const username = profile.displayName;
        const profile_picture = profile.photos?.[0]?.value;

        if (!email) return done(new Error("No email found"), false);

        // Check if user exists in Supabase
        let { data: existingUser } = await supabase.from("users").select("*").eq("email", email).single();

        if (!existingUser) {
          // Insert new user
          const { data, error } = await supabase.from("users").insert({
            email,
            username,
            profile_picture,
            gender: "unknown",
          });

          if (error) return done(error, false);

          existingUser = data;
        }

        return done(null, existingUseras User);
      } catch (error:any) {
        return done(error, false);
      }
    }
  )
);


passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const { data: user, error } = await supabase.from("users").select("*").eq("id", id).single();
    if (error) return done(error, null);
    done(null, user);
  } catch (error:any) {
    done(error, null);
  }
});

export default passport;
