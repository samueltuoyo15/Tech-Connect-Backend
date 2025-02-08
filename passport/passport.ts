import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from '../models/User';
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
  { clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, callbackURL: process.env.GOOGLE_CALLBACK_URL, scope[
        "https://www.googleapis.com/auth/user.birthday.read",
        "https://www.googleapis.com/auth/user.phonenumbers.read",
        "https://www.googleapis.com/auth/user.addresses.read"
    ]},
  async (accessToken, refreshToekn, profile, done) => {
    try{
      let user = await user.findOne({email: profile.emails?.[0].value})
      
      if(!user){
        await user.create({
          username: profile.displayName,
          email: profile.emails?.[0].value,
          profile_picture: profile.photos?.[0].value,
          gender: profile.gender
          fullname: profile.name?.givenName + "" + profile.name?.familyName,
          address: profile.addresses?.[0]?. formattedValue,
          locale: profile._json.locale,
          birthday: profile._json.birthday,
          isVerified: true,
        })
      }
    }
   }
 )
)
  
export default passport;