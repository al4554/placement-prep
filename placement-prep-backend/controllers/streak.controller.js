import mongoose from "mongoose";
import UserQuestion from "../models/UserQuestion.js";

export const getUserStreak = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const solvedDates = await UserQuestion.aggregate([
      {  $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: "$solvedAt" } },
      { $sort: { _id: 1 } },
    ]);

    if (solvedDates.length === 0) {
      return res.json({ currentStreak: 0, longestStreak: 0 });
    }

    const dates = solvedDates.map((d) => d._id);

    let longestStreak = 0;
    let streak = 0;
    let prevDate = null;

    for (let date of dates) {
      if (!prevDate) {
        streak = 1;
      } else {
        const diff =
          (new Date(date) - new Date(prevDate)) / (1000 * 60 * 60 * 24);

        streak = diff === 1 ? streak + 1 : 1;
      }

      longestStreak = Math.max(longestStreak, streak);
      prevDate = date;
    }

    const today = new Date().toISOString().split("T")[0];
    const lastDate = dates[dates.length - 1];
    const diffFromToday =
      (new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24);

    const currentStreak =
      diffFromToday === 0 || diffFromToday === 1 ? streak : 0;

    res.json({ currentStreak, longestStreak });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
