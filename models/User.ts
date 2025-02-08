import mongoose, {Schema, Document} from "mongoose"

export interface UserInterface extends Document{
  fullname: string;
  username: string;
  email: string;
  password?: string;
  profile_picture: string;
  gender: string;
  isAdmin: false;
  birthday: string;
  address: string;
  locale: string;
  bio: string;
  joined: Date;
  isVerified: boolean;
  resetToken: string;
  resetTokenExpiry: Date;
  googleId?: string;
}

const userSchema: Schema = new Schema<UserInterface>(
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
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiry: {
    type: date,
    default: Date.now()
  },
  googleId: {
    type: String,
    unique: true,
    parse: true
  },
  birthday: {
    type: String,
    default: "Not Specified"
  },
  locale: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: ""
  },
},
 {timestamps: true},
)

export default mongoose.model<UserInterface>("User", userSchema)
