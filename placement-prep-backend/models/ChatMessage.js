import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      required: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
      default: null // null = root question
    }
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", ChatMessageSchema);
