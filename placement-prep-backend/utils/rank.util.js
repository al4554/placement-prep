import User from "../models/User.js";
import UserQuestion from "../models/UserQuestion.js";

export const getRankMap = async () => {
  const users = await User.aggregate([
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
    { $sort: { totalSolved: -1 } }
  ]);

  const rankMap = {};
  users.forEach((u, idx) => {
    rankMap[u._id.toString()] = idx + 1;
  });

  return rankMap;
};
