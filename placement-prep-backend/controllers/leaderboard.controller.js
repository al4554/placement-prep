import User from "../models/User.js";
import UserQuestion from "../models/UserQuestion.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.aggregate([
      {
        $lookup: {
          from: "userquestions",
          localField: "_id",
          foreignField: "user",
          as: "solves"
        }
      },
      {
        $addFields: {
          totalSolved: { $size: "$solves" }
        }
      },
      {
        $project: {
          name: 1,
          role: 1,
          totalSolved: 1
        }
      },
      {
        $sort: {
          totalSolved: -1
        }
      }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
