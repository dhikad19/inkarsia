import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReaction extends Document {
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  comment?: mongoose.Types.ObjectId;
  type: "like" | "love" | "haha" | "sad" | "angry";
  createdAt: Date;
}

const ReactionSchema: Schema<IReaction> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    type: {
      type: String,
      enum: ["like", "love", "haha", "sad", "angry"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Reaction: Model<IReaction> =
  mongoose.models.Reaction ||
  mongoose.model<IReaction>("Reaction", ReactionSchema);

export default Reaction;
