import ChatMessage from "../models/ChatMessage.js";
import { getRankMap } from "../utils/rank.util.js";

export const postMessage = async (req, res) => {
  try {
    const { text, parent } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (parent) {
      const parentMsg = await ChatMessage.findById(parent);
      if (!parentMsg) {
        return res.status(404).json({ message: "Parent message not found" });
      }

      const rankMap = await getRankMap();

      const myRank = rankMap[req.user._id.toString()];
      const authorRank = rankMap[parentMsg.author.toString()];

      if (myRank >= authorRank) {
        return res.status(403).json({
          message: "Only higher-ranked users can reply"
        });
      }
    }

    const msg = await ChatMessage.create({
      author: req.user._id,
      text,
      parent: parent || null
    });

    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArenaMessages = async (req, res) => {
  const rankMap = await getRankMap();
  const myRank = rankMap[req.user._id.toString()];

  const messages = await ChatMessage.find({ parent: null })
    .populate("author", "name")
    .sort({ createdAt: -1 });

  // Only show messages from users with LOWER rank score (worse rank)
  const visible = messages.filter(
    m => rankMap[m.author._id.toString()] >= myRank
  );

  res.json({ myRank, messages: visible });
};

export const getReplies = async (req, res) => {
  const replies = await ChatMessage.find({ parent: req.params.id })
    .populate("author", "name")
    .sort({ createdAt: 1 });

  res.json(replies);
};
