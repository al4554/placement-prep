import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SubjectCard from "../components/SubjectCard";
import PageWrapper from "../components/PageWrapper";

export default function SubjectPage({ category, title }) {
  const { token } = useAuth();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/content/subjects?category=${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setSubjects);
  }, [category, token]);

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto p-6 md:p-10">

        {/* Page heading */}
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          {title}
        </h1>

        {/* Subject list */}
        <div className="space-y-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
            />
          ))}
        </div>

      </div>
    </PageWrapper>
  );
}
