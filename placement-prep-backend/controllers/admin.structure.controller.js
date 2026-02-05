import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";
import Resource from "../models/Resource.js";

export const createFullStructure = async (req, res) => {
  try {
    const { subject, topics } = req.body;

    if (!subject?.name || !subject?.category || !topics?.length) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // 1️⃣ Create Subject
    const createdSubject = await Subject.create(subject);

    // 2️⃣ Create Topics + Resources
    for (const t of topics) {
      const createdTopic = await Topic.create({
        subject: createdSubject._id,
        title: t.title,
        order: t.order,
      });

      if (t.resources?.length) {
        const resourcesPayload = t.resources.map(r => ({
          topic: createdTopic._id,
          title: r.title,
          type: r.type,
          link: r.link,
        }));

        await Resource.insertMany(resourcesPayload);
      }
    }

    res.status(201).json({
      message: "Structure created successfully",
      subjectId: createdSubject._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
