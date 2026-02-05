import Question from "../models/Questions.js";

export const addQuestion = async (req, res) => {
  try {
    const { code, title, link, topic, difficulty } = req.body;

    const question = await Question.create({
      code,
      title,
      link,
      topic,
      difficulty
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
