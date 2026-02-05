import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";
import Button from "../ui/Button";

export default function ChatArena() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [myRank, setMyRank] = useState(null);
  const [replies, setReplies] = useState({});

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data.messages);
    setMyRank(data.myRank);
  };

  const fetchReplies = async (id) => {
    const res = await fetch(`http://localhost:5000/api/chat/${id}/replies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setReplies((prev) => ({ ...prev, [id]: data }));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const postMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchMessages();
  };

  return (
    <PageWrapper>
      <div className="p-10 max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-3 dark:text-white">💬 Chat Arena</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
          Your rank: <b className="text-blue-600">#{myRank}</b> · You can mentor users below you
        </p>

        {/* Messages */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg 
                        border border-gray-200 dark:border-gray-700 space-y-4">

          {messages.map((m) => (
            <div 
              key={m._id}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 
                         hover:shadow transition bg-gray-50 dark:bg-gray-900"
            >
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {m.author.name}
              </p>

              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {m.text}
              </p>

              <button
                onClick={() => fetchReplies(m._id)}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View replies
              </button>

              {replies[m._id]?.map((r) => (
                <div 
                  key={r._id} 
                  className="ml-5 mt-3 p-3 bg-white dark:bg-gray-800 
                             border border-gray-200 dark:border-gray-700
                             rounded-xl shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {r.author.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Send bar */}
        <div className="flex gap-3 mt-6">
          <input
            className="flex-1 p-3 bg-white dark:bg-gray-800
                      border border-gray-300 dark:border-gray-700
                      text-gray-900 dark:text-gray-100 
                      rounded-xl shadow-sm
                      focus:ring-2 focus:ring-blue-500 
                      transition"
            placeholder="Ask a question..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button onClick={postMessage} className="px-6 py-3">
            Send
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
