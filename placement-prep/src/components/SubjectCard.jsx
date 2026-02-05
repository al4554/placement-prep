import { useEffect, useState } from "react";
import TopicAccordion from "./TopicAccordion";
import { useAuth } from "../context/AuthContext";

export default function SubjectCard({ subject }) {
  const { token } = useAuth();
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);

  const loadTopics = async () => {
    const res = await fetch(
      `http://localhost:5000/api/content/subjects/${subject._id}/topics`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await res.json();
    setTopics(data);
  };

  const toggle = () => {
    setOpen(!open);
    if (!open) loadTopics();
  };

  return (
    <div className="bg-white rounded-xl shadow border">
      <div
        onClick={toggle}
        className="p-5 cursor-pointer flex justify-between items-center"
      >
        <div>
          <h2 className="text-xl font-semibold">{subject.name}</h2>
          <p className="text-sm text-gray-600">{subject.description}</p>
        </div>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </div>

      {open && (
        <div className="px-5 pb-5 space-y-3">
          {topics.map(topic => (
            <TopicAccordion key={topic._id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}
