import mongoose from "mongoose";
import DsaProgress from "../models/DsaProgress.js";

// Add or update today's progress
// export const upsertTodayProgress = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { solvedCount } = req.body;

//     const today = new Date().toISOString().split("T")[0];

//     const progress = await DsaProgress.findOneAndUpdate(
//       { user: userId, date: today },
//       { solvedCount },
//       { upsert: true, new: true }
//     );

//     res.json(progress);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all progress for heatmap & graph
export const getUserProgress = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const progress = await DsaProgress.find({ user: userId })
      .sort({ date: 1 })
      .select("date solvedCount -_id");

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};
