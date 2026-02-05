import Resource from "../models/Resource.js";

export const createResource = async (req, res) => {
  const { topicId, title, type, link } = req.body;

  const resource = await Resource.create({
    topic: topicId,
    title,
    type,
    link
  });

  res.status(201).json(resource);
};

export const getResourcesByTopic = async (req, res) => {
  const resources = await Resource.find({
    topic: req.params.topicId
  });

  res.json(resources);
};
