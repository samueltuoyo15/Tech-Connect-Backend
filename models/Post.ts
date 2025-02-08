import mongoose, {Schema, Document} from "mongoose"
export interface PostInterface extends Document{
  user: mongoose.Types.ObjectId;
  description: string;
  image?: string;
  video?: string;
  like: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const postSchema: Schema = new Schema<PostInterface>(
  {
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  description: {
    type: String,
    required: true
  },
  
  image: {
    type: String,
    default: ""
  },
  video: {
    type: String,
    default: ""
  },
  
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: [{type: Schema.Types.ObjectId, ref: "User"}]
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
},
 {timestamps: true},
)

export default mongoose.model<PostInterface>("Post", postSchema)
