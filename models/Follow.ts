import mongoose, {Schema, Document} from "mongoose"

export interface FollowInterface extends Document{
  following: mongoose.Types.ObjectId;
  followers: mongoose.Types.ObjectId;
  createdAt: Date;
}

const followSchema: Schema = new Schema<FollowInterface>(
  {
  following: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  followers: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
},
 {timestamps: true},
)

export default mongoose.model<FollowInterface>("Follow", followSchema)
