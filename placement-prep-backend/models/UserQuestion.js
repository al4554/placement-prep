import mongoose from "mongoose";

const UserQuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    solvedAt: {
      type: String, // YYYY-MM-DD
      required: true
    }
  },
  { timestamps: true }
);

UserQuestionSchema.index({ user: 1, question: 1 }, { unique: true });

export default mongoose.model("UserQuestion", UserQuestionSchema);
