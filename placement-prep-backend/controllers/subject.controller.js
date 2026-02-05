import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  const { name, category, description } = req.body;

  const subject = await Subject.create({
    name,
    category,
    description
  });

  res.status(201).json(subject);
};

export const getSubjects = async (req, res) => {
  const { category } = req.query;

  const filter = category ? { category } : {};
  const subjects = await Subject.find(filter).sort({ createdAt: 1 });

  res.json(subjects);
};
