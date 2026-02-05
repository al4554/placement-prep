import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ResourceItem from "./ResourceItem";

export default function TopicAccordion({ topic }) {
  const { token } = useAuth();
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);

  const loadResources = async () => {
    const res = await fetch(
      `http://localhost:5000/api/content/topics/${topic._id}/resources`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await res.json();
    setResources(data);
  };

  const toggle = () => {
    setOpen(!open);
    if (!open) loadResources();
  };

  return (
    <div className="border rounded-lg">
      <div
        onClick={toggle}
        className="p-3 cursor-pointer flex justify-between"
      >
        <span className="font-medium">{topic.title}</span>
        <span>{open ? "▼" : "▶"}</span>
      </div>

      {open && (
        <div className="pl-4 pb-3 space-y-2">
          {resources.map(r => (
            <ResourceItem key={r._id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
