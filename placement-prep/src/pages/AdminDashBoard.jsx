import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import Button from "../ui/Button";

const DSA_TOPICS = ["Arrays", "Strings", "Trees", "Graphs", "DP"];
const TABS = ["DSA", "SUBJECTS & RESOURCES"];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("DSA");
  const [loading, setLoading] = useState(false);

  /* ============================
      DSA QUESTION STATE
  ============================ */
  const [dsaForm, setDsaForm] = useState({
    code: "",
    title: "",
    link: "",
    topic: "Arrays",
    difficulty: "Easy",
  });

  const addDsaQuestion = async () => {
    if (!dsaForm.code || !dsaForm.title || !dsaForm.link) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...dsaForm,
        code: dsaForm.code.toUpperCase(),
      }),
    });

    setDsaForm({
      code: "",
      title: "",
      link: "",
      topic: "Arrays",
      difficulty: "Easy",
    });

    setLoading(false);
  };

  /* ============================
      SUBJECT / TOPIC / RESOURCE
  ============================ */

  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    category: "CORE",
    description: "",
  });

  const [topicForm, setTopicForm] = useState({
    subjectId: "",
    title: "",
    order: 1,
  });

  const [resourceForm, setResourceForm] = useState({
    topicId: "",
    title: "",
    type: "YOUTUBE",
    link: "",
  });

  /* -------- FETCH SUBJECTS (KEY FIX) -------- */
const fetchSubjects = async () => {
  if (!token) return;

  try {
    const res = await fetch("/api/admin/subjects", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setSubjects(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Failed to fetch subjects");
  }
};


  /* -------- FETCH TOPICS WHEN SUBJECT CHANGES -------- */
  useEffect(() => {
    if (!topicForm.subjectId) return;

    fetch(`/api/admin/subjects/${topicForm.subjectId}/topics`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTopics(Array.isArray(data) ? data : []));
  }, [topicForm.subjectId, token]);

  /* -------- ADD SUBJECT -------- */
  const addSubject = async () => {
  if (!subjectForm.name.trim()) {
    alert("Subject name required");
    return;
  }

  setLoading(true);

  try {
    await fetch("/api/admin/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subjectForm),
    });

    setSubjectForm({ name: "", category: "CORE", description: "" });

    await fetchSubjects(); // refetch subjects
  } catch (err) {
    alert("Failed to add subject");
  } finally {
    setLoading(false); // 🔥 ALWAYS runs
  }
};

useEffect(() => {
  fetchSubjects();
}, [token]);

  /* -------- ADD TOPIC -------- */
  const addTopic = async () => {
    if (!topicForm.subjectId || !topicForm.title.trim()) {
      alert("Select subject and enter topic title");
      return;
    }

    setLoading(true);

    await fetch("/api/admin/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(topicForm),
    });

    setTopicForm({ ...topicForm, title: "", order: topicForm.order + 1 });

    setLoading(false);
  };

  /* -------- ADD RESOURCE -------- */
  const addResource = async () => {
    if (
      !resourceForm.topicId ||
      !resourceForm.title.trim() ||
      !resourceForm.link.trim()
    ) {
      alert("All resource fields required");
      return;
    }

    setLoading(true);

    await fetch("/api/admin/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resourceForm),
    });

    setResourceForm({
      topicId: resourceForm.topicId,
      title: "",
      type: "YOUTUBE",
      link: "",
    });

    setLoading(false);
  };

  /* ============================
      UI
  ============================ */

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto p-8">

        {/* TABS */}
        <div className="flex gap-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= DSA TAB ================= */}
        {activeTab === "DSA" && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Add DSA Question</h2>

            <input
              placeholder="Code (LC-15)"
              value={dsaForm.code}
              onChange={(e) => setDsaForm({ ...dsaForm, code: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Title"
              value={dsaForm.title}
              onChange={(e) => setDsaForm({ ...dsaForm, title: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="LeetCode Link"
              value={dsaForm.link}
              onChange={(e) => setDsaForm({ ...dsaForm, link: e.target.value })}
              className="w-full p-2 border rounded"
            />

            <select
              value={dsaForm.topic}
              onChange={(e) => setDsaForm({ ...dsaForm, topic: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {DSA_TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <select
              value={dsaForm.difficulty}
              onChange={(e) =>
                setDsaForm({ ...dsaForm, difficulty: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <Button loading={loading} onClick={addDsaQuestion}>
              Add DSA Question
            </Button>
          </div>
        )}

        {/* ================= SUBJECTS TAB ================= */}
        {activeTab === "SUBJECTS & RESOURCES" && (
          <div className="space-y-10">

            {/* ADD SUBJECT */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h2 className="font-semibold">Add Subject</h2>

              <input
                placeholder="Subject Name (DBMS)"
                value={subjectForm.name}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={subjectForm.category}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, category: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="CORE">CORE</option>
                <option value="LLD">LLD</option>
                <option value="HLD">HLD</option>
              </select>

              <Button loading={loading} onClick={addSubject}>
                Add Subject
              </Button>
            </div>

            {/* ADD TOPIC */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h2 className="font-semibold">Add Topic</h2>

              <select
                value={topicForm.subjectId}
                onChange={(e) =>
                  setTopicForm({ ...topicForm, subjectId: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Topic Title"
                value={topicForm.title}
                onChange={(e) =>
                  setTopicForm({ ...topicForm, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <Button loading={loading} onClick={addTopic}>
                Add Topic
              </Button>
            </div>

            {/* ADD RESOURCE */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h2 className="font-semibold">Add Resource</h2>

              <select
                value={resourceForm.topicId}
                onChange={(e) =>
                  setResourceForm({ ...resourceForm, topicId: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="">Select Topic</option>
                {topics.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.title}
                  </option>
                ))}
              </select>

              <input
                placeholder="Resource Title"
                value={resourceForm.title}
                onChange={(e) =>
                  setResourceForm({ ...resourceForm, title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={resourceForm.type}
                onChange={(e) =>
                  setResourceForm({ ...resourceForm, type: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="YOUTUBE">YouTube</option>
                <option value="ARTICLE">Article</option>
                <option value="NOTES">Notes</option>
              </select>

              <input
                placeholder="Link"
                value={resourceForm.link}
                onChange={(e) =>
                  setResourceForm({ ...resourceForm, link: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <Button loading={loading} onClick={addResource}>
                Add Resource
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
