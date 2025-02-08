import User from '';
import mongoose, {Schema, Document} from "mongoose"

export interface UserInterface extends Document{
  fullname: string;
  username: string;
  email: string;
  password?: string;
  profile_picture: string;
  gender: string;
  isAdmin: false;
  bio: string;
  joined: Date;
  isVerified: boolean;
  googleId?: string;
}

const userSchema = new Schema<UserInterface>(
  {
  fullname: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: "Not Specified"
  },
  bio: {
    type: String,
    default: ""
  },
  joined: {
    type: Date,
    default: Date.now()
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    unique: true,
    parse: true
  },
},
 {timestamps: true},
)

const user = mongoose.model<UserInterface>("User", userSchema)
export default user