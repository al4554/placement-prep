import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Heatmap from "../components/Heatmap";
import ProgressGraph from "../components/ProgressGraph";
import PageWrapper from "../components/PageWrapper";

export default function DsaSheet() {
  const { token } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [progress, setProgress] = useState([]);

  const fetchQuestions = () => {
    fetch("/api/questions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setQuestions);
  };

  const fetchProgress = () => {
    fetch("/api/dsa", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProgress);
  };

  const fetchStreak = () => {
    fetch("/api/streak", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setStreak);
  };

  useEffect(() => {
    if (token) {
      fetchQuestions();
      fetchProgress();
      fetchStreak();
    }
  }, [token]);

  const markSolved = async (id) => {
    await fetch("http://localhost:5000/api/questions/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ questionId: id }),
    });
    fetchQuestions();
    fetchProgress();
    fetchStreak();
  };

  const toggleSolved = async (q) => {
    if (q.solved) {
      // 🔴 UNDO SOLVE
      await fetch(`http://localhost:5000/api/questions/solve/${q._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // 🟢 SOLVE
      await fetch("http://localhost:5000/api/questions/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ questionId: q._id }),
      });
    }

    // 🔄 REFRESH EVERYTHING
    fetchQuestions();
    fetchProgress();
    fetchStreak();
  };

  const totalSolved = questions.filter((q) => q.solved).length;
  const easySolved = questions.filter(
    (q) => q.solved && q.difficulty === "Easy",
  ).length;
  const mediumSolved = questions.filter(
    (q) => q.solved && q.difficulty === "Medium",
  ).length;
  const hardSolved = questions.filter(
    (q) => q.solved && q.difficulty === "Hard",
  ).length;

  const totalCount = questions.length || 1;

  return (
    <PageWrapper>
      <div className="px-10 py-6">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-8 dark:text-white">DSA Sheet</h1>

        {/* STREAK CARDS */}
        <div className="flex gap-6 mb-10">
          {/* Current Streak */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center w-48">
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              <span className="inline-block flame-animate">🔥</span> Current
              Streak
            </p>
            <p className="text-3xl font-bold text-green-600">
              {streak.currentStreak} days
            </p>
          </div>

          {/* Longest Streak */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow text-center w-48">
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              <span className="inline-block">🏆</span> Longest Streak
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {streak.longestStreak} days
            </p>
          </div>
        </div>

        {/* PROGRESS BLOCK */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
          <h2 className="font-semibold text-xl mb-4 dark:text-gray-100">
            Progress
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {totalSolved} / {totalCount} solved
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-3 bg-green-500 rounded-full transition-all"
              style={{ width: `${(totalSolved / totalCount) * 100}%` }}
            ></div>
          </div>

          {/* Difficulty Stats */}
          <div className="flex gap-6 mt-4 text-sm">
            <p className="text-green-500">Easy: {easySolved}</p>
            <p className="text-yellow-400">Medium: {mediumSolved}</p>
            <p className="text-red-500">Hard: {hardSolved}</p>
          </div>
        </div>

        {/* MAIN ANALYTICS GRID */}
        <div className="grid grid-cols-12 gap-8 mb-12">
          {/* LEFT: Heatmap */}
          <div className="col-span-7 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <Heatmap data={progress} />
          </div>

          {/* RIGHT: Progress Graph */}
          <div className="col-span-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <ProgressGraph data={progress} />
          </div>
        </div>

        {/* QUESTIONS TABLE */}
        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow">
          <h2 className="font-semibold text-xl mb-4">Questions</h2>

          <table className="w-full">
            {/* TABLE HEADER */}
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <tr>
                <th className="p-3">✔</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Question</th>
                <th className="p-3 text-left">Topic</th>
                <th className="p-3 text-left">Difficulty</th>
                <th className="p-3 text-left">Solved At</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {questions.map((q) => (
                <tr
                  key={q._id}
                  className="
            border-t border-gray-300 dark:border-gray-600 
            hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors
          "
                >
                  <td className="text-center p-3">
                    <input
                      type="checkbox"
                      checked={q.solved}
                      onChange={() => toggleSolved(q)}
                    />
                  </td>
                  <td className="p-3">{q.code}</td>
                  <td className="p-3">
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {q.title}
                    </a>
                  </td>
                  <td className="p-3">{q.topic}</td>
                  <td className="p-3">{q.difficulty}</td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                    {q.solvedAt ? (
                      <span>
                        {q.solvedAt} <br />
                        <span className="text-xs opacity-70">
                          {q.solvedTime}
                        </span>
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrapper>
  );
}
