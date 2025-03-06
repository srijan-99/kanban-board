import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useKanban } from "./context/KanbanContext";
import { KanbanSection } from "./components/KanbanSection";
import Header from "./components/Header";
import toast, { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

function App() {
  const { user } = useAuth();
  const { sections, moveTask, addSection, reorderSections, loading, error } =
    useKanban();
  const [sectionUI, setSectionUI] = useState({
    title: "",
    showAdd: false,
  });

  // const location = useLocation();
  // useEffect(() => {
  //   if (!user && location.pathname !== "/login" && location.pathname !== "/signup") {
  //     alert("Login required");
  //   }
  // }, [user, location]);

  const handleDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;
    if (!destination) return;

    if (type === "section" && source.index !== destination.index) {
      reorderSections(source.index, destination.index);
    } else if (
      type === "task" &&
      (source.droppableId !== destination.droppableId ||
        source.index !== destination.index)
    ) {
      moveTask(source.droppableId, destination.droppableId, draggableId);
    }
  };

  const handleAddSection = () => {
    const trimmedTitle = sectionUI.title.trim();
    if (trimmedTitle && !sections.some((s) => s.title === trimmedTitle)) {
      addSection(trimmedTitle);
      setSectionUI({ title: "", showAdd: false });
    } else {
      toast.error("Section title is required and must be unique");
    }
  };

  return (
    // <AuthProvider>
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-center" />
        <Header />

        {loading && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90">
            Loading...
          </div>
        )}
        {error && (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-90">
            Error: {error}
          </div>
        )}

        <main className="px-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={user ?
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                  droppableId="board"
                  type="section"
                  direction="horizontal"
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex overflow-x-auto"
                    >
                      {sections?.map((section, index) => (
                        <KanbanSection
                          key={section._id}
                          section={section}
                          index={index}
                        />
                      ))}
                      {provided.placeholder}

                      {sectionUI.showAdd ? (
                        <div className="flex-shrink-0 p-4 bg-white rounded-lg shadow w-80">
                          <input
                            type="text"
                            value={sectionUI.title}
                            onChange={(e) =>
                              setSectionUI({
                                ...sectionUI,
                                title: e.target.value,
                              })
                            }
                            placeholder="Enter section title"
                            className="w-full p-2 mb-2 border rounded-md"
                            autoFocus
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleAddSection}
                              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                              Add
                            </button>
                            <button
                              onClick={() =>
                                setSectionUI({
                                  ...sectionUI,
                                  showAdd: false,
                                })
                              }
                              className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setSectionUI({ ...sectionUI, showAdd: true })
                          }
                          className="flex items-start justify-start p-4 text-gray-400 hover:text-gray-900"
                        >
                          + Add Section
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext> : (alert(`Login Required`), <Navigate to="/login" />)
            } />
          </Routes>
        </main>
      </div>
    </Router>
    // </AuthProvider>
  );
}

export default App;