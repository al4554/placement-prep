import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import Button from "../ui/Button";

export default function AiPlanner() {
  const { token } = useAuth();
  const [topics, setTopics] = useState("");
  const [deadline, setDeadline] = useState("");
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!topics || !deadline) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/planner/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topics: topics.split(",").map((t) => t.trim()),
          deadline,
        }),
      });

      const data = await res.json();
      setPlan(data.plan || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Study Planner</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Generate a personalized study plan based on your goals.
        </p>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 space-y-4">
          <input
            className="
              w-full
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              rounded p-2
            "
            placeholder="Topics (Arrays, DP, Graphs)"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />

          <input
            type="date"
            className="
              w-full
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              rounded p-2
            "
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <Button loading={loading} onClick={generatePlan} className="w-full">
            Generate Plan
          </Button>
        </div>

        {/* Result */}
        {plan.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">📅 Your AI Plan</h2>

            <div className="space-y-2">
              {plan.map((p, idx) => (
                <div
                  key={idx}
                  className="
                    flex justify-between items-center
                    border-b border-gray-200 dark:border-gray-700
                    py-2 text-sm
                  "
                >
                  <span>{p.date}</span>
                  <span className="font-medium">{p.topic}</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {p.targetQuestions} Qs
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
