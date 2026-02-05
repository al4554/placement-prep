import Question from "../models/Questions.js";
import UserQuestion from "../models/UserQuestion.js";
import DsaProgress from "../models/DsaProgress.js";

// ✅ GET all questions

export const getAllQuestions = async (req, res) => {
  try {
    const userId = req.user.id;

    const questions = await Question.find().sort({ createdAt: 1 });

    const userSolved = await UserQuestion.find({ user: userId });

    const solvedMap = new Map();
    userSolved.forEach((uq) => {
      solvedMap.set(uq.question.toString(), uq);
    });

    const result = questions.map((q) => {
      const solvedEntry = solvedMap.get(q._id.toString());

      return {
        ...q.toObject(),
        solved: !!solvedEntry,
        solvedAt: solvedEntry?.solvedAt || null,
        solvedTime: solvedEntry
          ? new Date(solvedEntry.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ ADMIN: Add question
export const addQuestion = async (req, res) => {
  try {
    const { code, title, link, topic, difficulty } = req.body;

    // 🔥 EXACT schema-based validation (NOTHING EXTRA)
    if (!code || !title || !link || !topic || !difficulty) {
      return res.status(400).json({
        message: "All fields are required (code, title, link, topic, difficulty)",
      });
    }

    const question = await Question.create({
      code: code.trim(),
      title: title.trim(),
      link: link.trim(),
      topic,
      difficulty,
    });

    return res.status(201).json(question);
  } catch (error) {
    console.error("ADD QUESTION ERROR:", error);

    // Duplicate LC code protection
    if (error.code === 11000) {
      return res.status(400).json({ message: "Question already exists" });
    }

    return res.status(500).json({ message: error.message });
  }
};


// ✅ USER: Mark question solved
export const markSolved = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "questionId required" });
    }

    const today = new Date().toISOString().split("T")[0];

    await UserQuestion.create({
      user: userId,
      question: questionId,
      solvedAt: today,
    });

    const count = await UserQuestion.countDocuments({
      user: userId,
      solvedAt: today,
    });

    await DsaProgress.findOneAndUpdate(
      { user: userId, date: today },
      { solvedCount: count },
      { upsert: true, new: true }
    );

    return res.json({ message: "Marked as solved", count });
  } catch (error) {
    console.error("MARK SOLVED ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const unmarkSolved = async (req, res) => {
  try {
    const userId = req.user.id;
    const { questionId } = req.params;

    const today = new Date().toISOString().split("T")[0];

    // Remove solved entry
    await UserQuestion.findOneAndDelete({
      user: userId,
      question: questionId
    });

    // Recalculate today's solved count
    const count = await UserQuestion.countDocuments({
      user: userId,
      solvedAt: today
    });

    // Update progress
    await DsaProgress.findOneAndUpdate(
      { user: userId, date: today },
      { solvedCount: count },
      { upsert: true }
    );

    res.json({ message: "Unmarked as solved", count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
