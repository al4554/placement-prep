import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    order: Number
  },
  { timestamps: true }
);

export default mongoose.model("Topic", TopicSchema);
