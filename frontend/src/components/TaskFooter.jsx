import { DueDate } from "./DueDate";

export function TaskFooter({ assignee, dueDate, tag }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-center items-center gap-3">
        <div className="w-6 h-6 bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-xs font-semibold">
          {assignee
            ? assignee.name
                .split(" ")
                .map((part) => part[0]?.toUpperCase())
                .join("")
            : "NA"}
        </div>
        <div className="flex items-center justify-between space-x-2">
          <DueDate date={dueDate} />
        </div>
      </div>
      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-400">
        {tag ?? "No Tag"}
      </span>
    </div>
  );
}