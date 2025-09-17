import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  author: string; // bisa diganti ObjectId kalau user login
  content: string;
  createdAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
