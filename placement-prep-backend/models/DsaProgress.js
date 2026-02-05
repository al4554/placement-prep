import mongoose from "mongoose";

const DsaProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true
    },
    solvedCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Ensure one entry per user per day
DsaProgressSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("DsaProgress", DsaProgressSchema);
