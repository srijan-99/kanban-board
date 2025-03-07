import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const KanbanContext = createContext();

export const useKanban = () => useContext(KanbanContext);

export const KanbanProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://kanban-backend-gamma.vercel.app/api/sections');
        if (response.status === 401) {
          alert(`Login Required`);
          window.location.href = '/login';
          return;
        }
        setSections(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setError(error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  const addSection = async (title) => {
    try {
      const response = await axios.post('https://kanban-backend-gamma.vercel.app/api/sections', { title });
      setSections((prev) => [...prev, response.data]);
      toast.success('Section added successfully');
    } catch (error) {
      console.error('Error adding section:', error);
      toast.error('Error adding section');
    }
  };

  const editSection = async (sectionId, newTitle) => {
    try {
      const response = await axios.patch(`https://kanban-backend-gamma.vercel.app/api/sections/${sectionId}`, { title: newTitle });
      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId ? { ...section, title: response.data.title } : section
        )
      );
      toast.success("Section updated successfully");
    } catch (error) {
      console.error("Error editing section:", error);
      toast.error("Error updating section");
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      await axios.delete(`https://kanban-backend-gamma.vercel.app/api/sections/${sectionId}`);
      setSections((prev) => prev.filter((section) => section._id !== sectionId));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      toast.error("Error deleting section");
    }
  };


  const addTask = async (sectionId, taskData) => {
    try {
      const response = await axios.post(`https://kanban-backend-gamma.vercel.app/api/sections/${sectionId}/tasks`, taskData);
      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId
            ? { ...section, tasks: [...section.tasks, response.data] }
            : section
        )
      );
      toast.success('Task added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task');
      throw error;
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      const response = await axios.patch(`https://kanban-backend-gamma.vercel.app/api/tasks/${taskId}`, updatedData);
      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          tasks: section.tasks.map((task) =>
            task._id === taskId ? response.data : task
          ),
        }))
      );
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error editing task:', error);
      toast.error('Error editing task');
    }
  };

  const deleteTask = async (sectionId, taskId) => {
    try {
      await axios.delete(`https://kanban-backend-gamma.vercel.app/api/tasks/${taskId}`);
      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId
            ? { ...section, tasks: section.tasks.filter((t) => t._id !== taskId) }
            : section
        )
      );
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const moveTask = async (fromSectionId, toSectionId, taskId) => {
    try {
      await axios.put(`https://kanban-backend-gamma.vercel.app/api/tasks/${taskId}/move`, { fromSectionId, toSectionId });
      setSections((prev) =>
        prev.map((section) => {
          if (section._id === fromSectionId) {
            return { ...section, tasks: section.tasks.filter((t) => t._id !== taskId) };
          }
          if (section._id === toSectionId) {
            const sourceSection = prev.find((s) => s._id === fromSectionId);
            const task = sourceSection.tasks.find((t) => t._id === taskId);
            return { ...section, tasks: [...section.tasks, { ...task, sectionId: toSectionId }] };
          }
          return section;
        })
      );
    } catch (error) {
      console.error('Error moving task:', error);
      toast.error('Error moving task');
    }
  };

  const reorderSections = (sourceIndex, destinationIndex) => {
    const updated = Array.from(sections);
    const [moved] = updated.splice(sourceIndex, 1);
    updated.splice(destinationIndex, 0, moved);
    setSections(updated);
  };

  return (
    <KanbanContext.Provider
      value={{
        sections,
        addSection,
        editSection,
        deleteSection,
        addTask,
        editTask,
        deleteTask,
        moveTask,
        reorderSections,
        loading,
        error,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
