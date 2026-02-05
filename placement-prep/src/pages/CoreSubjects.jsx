import PageWrapper from "../components/PageWrapper";

export default function CoreSubjects() {
  const subjects = [
    { name: "DBMS"  },
    { name: "OS"  },
    { name: "Computer Networks" },
    { name: "OOPS"  },
    { name: "System Design Basics" },
  ];

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Core Subjects Preparation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((s, i) => (
            <div
              key={i}
              className="
                bg-white dark:bg-gray-800 
                p-6 border border-gray-200 dark:border-gray-700 
                rounded-xl shadow 
                hover:shadow-xl hover:-translate-y-1 transition-all 
                cursor-pointer
              "
            >
              <h3 className="font-semibold text-xl flex items-center gap-2 dark:text-white">
                {s.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Notes, quizzes & interview questions.
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
