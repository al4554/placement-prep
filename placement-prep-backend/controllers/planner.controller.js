import UserQuestion from "../models/UserQuestion.js";
import Question from "../models/Questions.js";

export const generatePlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topics, deadline } = req.body;

    const today = new Date();
    const endDate = new Date(deadline);

    const days =
      Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)) + 1;

    if (days <= 0) {
      return res.status(400).json({ message: "Invalid deadline" });
    }

    // Find solved count per topic (weak topics first)
    const analytics = await UserQuestion.aggregate([
      { $match: { user: req.user._id } },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "q"
        }
      },
      { $unwind: "$q" },
      { $match: { "q.topic": { $in: topics } } },
      {
        $group: {
          _id: "$q.topic",
          solved: { $sum: 1 }
        }
      }
    ]);

    const solvedMap = {};
    analytics.forEach(a => (solvedMap[a._id] = a.solved));

    const plan = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const topic =
        topics[i % topics.length];

      plan.push({
        date: date.toISOString().split("T")[0],
        topic,
        targetQuestions: solvedMap[topic] < 10 ? 5 : 3
      });
    }

    res.json({
      days,
      plan,
      note:
        "This is a mock AI plan. Add GROK_API_KEY to enable real AI."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
