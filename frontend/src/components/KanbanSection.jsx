import React, { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { useKanban } from '../context/KanbanContext';

export function KanbanSection({ section, index }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const { addTask } = useKanban();

  return (
    <Draggable draggableId={section._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-grey-300 rounded-lg p-4 w-80 flex-shrink-0"
        >
          <div className="flex justify-between items-center mb-4" {...provided.dragHandleProps}>
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-700 capitalize">{section.title}</h2>
              <span className="text-gray-400 text-sm">{section.tasks?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowAddModal(true)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 h-[80vh] overflow-y-auto">
            <Droppable droppableId={section._id} type="task">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 min-h-[200px]"
                >
                  {section && section.tasks && section?.tasks?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} sectionId={section._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {section.tasks?.length === 0 && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-full py-3 rounded-lg text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
                    >
                      + Add task
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          {showAddModal && (
            <AddTaskModal
              onClose={() => setShowAddModal(false)}
              onSubmit={(task) => addTask(section._id, task)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}