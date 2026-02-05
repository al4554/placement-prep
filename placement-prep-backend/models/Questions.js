import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", QuestionSchema);
