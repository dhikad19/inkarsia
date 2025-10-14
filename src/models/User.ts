import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    role: {
      type: String,
      enum: ["reader", "author", "designer", "developer", "client"],
    },
    language: { type: String, default: "en" },
    timezone: { type: String },
    interests: [{ type: String }],
    photoProfile: { type: String },
    isPro: { type: Boolean, default: false },
    proExpiresAt: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || model("User", userSchema);
