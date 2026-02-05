export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
}
