import { format } from "date-fns";

export function DueDate({ date }) {
  if (!date) return null;

  const today = new Date();
  const dueDate = new Date(date);
  const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
  
  const getDateStyle = () => {
    if (diffDays === 0) return "text-black font-semibold";
    if (diffDays === 1) return "text-blue-600 font-semibold";
    if (diffDays === -1) return "text-red-600 font-semibold";
    return "text-gray-400";
  };

  const getDateText = () => {
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === -1) return "Yesterday";
    return format(dueDate, "MMM d");
  };

  return (
    <span className={`text-xs ${getDateStyle()}`}>
      {getDateText()}
    </span>
  );
}