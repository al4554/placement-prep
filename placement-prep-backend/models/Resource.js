import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
  {
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["YOUTUBE", "NOTES", "ARTICLE"],
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);
