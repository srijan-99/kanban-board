import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export function TaskMenu({ onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </button>
      {showMenu && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <button
            onClick={() => {
              onEdit();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}