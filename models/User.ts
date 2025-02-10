import mongoose, {Schema, Document} from "mongoose"

export interface UserInterface extends Document{
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password?: string;
  profile_picture: string;
  gender: string;
  isAdmin: boolean;
  birthday: string;
  address: string;
  locale: string;
  bio: string;
  joined: Date;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  googleId?: string;
}

const userSchema: Schema = new Schema<UserInterface>(
  {
  email: {
    type: String,
    unique: true,
    required: true,
  },
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
    type: Date,
    default: null
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
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
  
  isAdmin: {
    type: Boolean,
    default: false,
  },
},
 {timestamps: true},
)

export default mongoose.model<UserInterface>("User", userSchema)
