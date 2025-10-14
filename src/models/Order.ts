import mongoose, { Schema, models, model } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    buyerEmail: String,
    status: {
      type: String,
      enum: ["created", "delivered", "claimed"],
      default: "created",
    },
    activationCode: { type: String, unique: true },
    claimedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
