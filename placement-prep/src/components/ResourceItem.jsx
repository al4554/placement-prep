export default function ResourceItem({ resource }) {
  const icon =
    resource.type === "YOUTUBE"
      ? "🎥"
      : resource.type === "NOTES"
      ? "📄"
      : "📰";

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
    >
      <span>{icon}</span>
      <span>{resource.title}</span>
    </a>
  );
}
