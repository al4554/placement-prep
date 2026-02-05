import Topic from "../models/Topic.js";

export const createTopic = async (req, res) => {
  const { subjectId, title, order } = req.body;

  const topic = await Topic.create({
    subject: subjectId,
    title,
    order
  });

  res.status(201).json(topic);
};

export const getTopicsBySubject = async (req, res) => {
  const topics = await Topic.find({
    subject: req.params.subjectId
  }).sort({ order: 1 });

  res.json(topics);
};
