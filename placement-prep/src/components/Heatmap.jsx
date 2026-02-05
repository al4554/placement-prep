import {
  startOfYear,
  endOfToday,
  eachDayOfInterval,
  startOfWeek,
  addWeeks,
  format,
  isBefore,
  isSameDay
} from "date-fns";

export default function Heatmap({ data }) {
  // Convert your API data to a hash for fast lookup
  const solvedMap = {};
  data.forEach((d) => {
    solvedMap[d.date] = d.solvedCount;
  });

  // 1. Get the first Sunday BEFORE the year starts
  const yearStart = startOfYear(new Date());
  const gridStart = startOfWeek(yearStart, { weekStartsOn: 0 }); // 0 = Sunday

  // 2. 53 weeks (max GitHub style)
  const TOTAL_WEEKS = 53;

  const weeks = [];
  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const weekStart = addWeeks(gridStart, w);
    const days = eachDayOfInterval({
      start: weekStart,
      end: addWeeks(weekStart, 1)
    }).slice(0, 7); // exactly 7 days

    weeks.push(days);
  }

  const getColor = (count) => {
    if (!count) return "bg-gray-200";
    if (count <= 1) return "bg-green-200";
    if (count <= 3) return "bg-green-400";
    if (count <= 5) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <div>
      <h2 className="font-semibold mb-3">DSA Activity</h2>

      <div className="flex gap-1 overflow-x-auto p-3 bg-white rounded-xl">
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1">
            {week.map((day, dIdx) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const count = solvedMap[dateStr] || 0;

              // past days = enabled cells
              const isFuture =
                !isBefore(day, endOfToday()) && !isSameDay(day, new Date());

              return (
                <div
                  key={dIdx}
                  className={`w-3.5 h-3.5 rounded-sm ${
                    isFuture ? "bg-gray-100" : getColor(count)
                  }`}
                  title={`${dateStr}: ${count} solved`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
