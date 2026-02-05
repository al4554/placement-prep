import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";

export default function Leaderboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsers);
  }, [token]);

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">🏆 Leaderboard</h1>

        <div className="overflow-hidden rounded-xl shadow bg-white dark:bg-gray-800">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <tr>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Total Solved</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u._id}
                  className="
                    border-t border-gray-300 dark:border-gray-600 
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    transition
                  "
                >
                  <td className="p-3 font-semibold">
                    {idx === 0
                      ? "🥇"
                      : idx === 1
                      ? "🥈"
                      : idx === 2
                      ? "🥉"
                      : idx + 1}
                  </td>

                  <td className="p-3 text-gray-900 dark:text-gray-100">
                    {u.name}
                  </td>

                  <td className="p-3 text-blue-600 dark:text-blue-400 font-semibold">
                    {u.totalSolved}
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
