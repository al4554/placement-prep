import UserQuestion from "../models/UserQuestion.js";

export const getTopicAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const analytics = await UserQuestion.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "questionData"
        }
      },
      { $unwind: "$questionData" },
      {
        $group: {
          _id: {
            topic: "$questionData.topic",
            difficulty: "$questionData.difficulty"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.topic",
          total: { $sum: "$count" },
          difficultySplit: {
            $push: {
              difficulty: "$_id.difficulty",
              count: "$count"
            }
          }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
