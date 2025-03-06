import React, { useState } from "react";
import { useKanban } from "../context/KanbanContext";
import { AddTaskModal } from "./AddTaskModal";
import { TaskFooter } from "./TaskFooter";
import { TaskMenu } from "./TaskMenu";

export function TaskCard({ task, sectionId }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { deleteTask, editTask } = useKanban();

  const handleEdit = async (updatedData) => {
    try {
      await editTask(task._id, updatedData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 capitalize">
            {(task?.name || task?.title) ?? "Untitled"}
          </h3>
          <TaskMenu
            onEdit={() => setShowEditModal(true)}
            onDelete={() => deleteTask(sectionId, task?._id)}
          />
        </div>

        {task?.description && (
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        )}

        <TaskFooter
          assignee={task?.assignee}
          dueDate={task?.dueDate}
          tag={task?.tag}
        />
      </div>

      {showEditModal && (
        <AddTaskModal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEdit}
          initialData={task}
          isEditing={true}
        />
      )}
    </>
  );
}
