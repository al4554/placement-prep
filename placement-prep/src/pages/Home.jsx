import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO SECTION */}
      <div className="p-10 flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold tracking-tight dark:text-white">
          PlacementPrep
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl text-lg">
          Your all-in-one AI-powered gamified platform for cracking placements.
        </p>
      </div>

      {/* FEATURE GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <HomeCard
          title="DSA Sheet"
          desc="Track progress, solve questions & build consistency."
          link="/dsa"
        />
        <HomeCard
          title="Core Subjects"
          desc="DBMS, OS, CN, OOP — explained with interview-ready notes."
          link="/core-subjects"
        />
        <HomeCard
          title="Chat Arena"
          desc="Ask doubts, answer juniors & grow your mentor score."
          link="/chat"
        />
        <HomeCard
          title="AI Planner"
          desc="Get a fully personalized preparation plan powered by AI."
          link="/ai-planner"
        />
        <HomeCard
          title="Leaderboard"
          desc="Compete with others and climb the ranks."
          link="/leaderboard"
        />
        <HomeCard
          title="Analytics"
          desc="Visualize your preparation with charts & insights."
          link="/analytics"
        />
      </div>
    </PageWrapper>
  );
}

function HomeCard({ title, desc, link }) {
  return (
    <a
      href={link}
      className="
        p-6
        bg-white dark:bg-gray-800 
        shadow 
        border border-gray-200 dark:border-gray-700
        rounded-xl 
        hover:shadow-xl hover:-translate-y-1 transition-all
      "
    >
      <h3 className="text-xl font-semibold dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
    </a>
  );
}
