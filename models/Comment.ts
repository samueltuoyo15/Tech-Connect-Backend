import mongoose, {Schema, Document} from "mongoose"

export interface CommentInterface extends Document{
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const commentSchema: Schema = new Schema<CommentInterface>(
  {
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  },
  text: {
    type: String,
    required: true,
  }
  createdAt: {
    type: Date,
    default: Date.now()
  }
},
 {timestamps: true},
)

export default mongoose.model<CommentInterface>("Comment", commentSchema)
