import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { useState, useEffect } from "react";

const nodes = [
  {
    id: "1",
    type: "default",
    data: { label: "Arrays & Hashing" },
    position: { x: 300, y: 0 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "2",
    type: "default",
    data: { label: "Two Pointers" },
    position: { x: 200, y: 100 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "3",
    type: "default",
    data: { label: "Stack" },
    position: { x: 400, y: 100 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "4",
    type: "default",
    data: { label: "Binary Search" },
    position: { x: 150, y: 200 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "5",
    type: "default",
    data: { label: "Sliding Window" },
    position: { x: 300, y: 200 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "6",
    type: "default",
    data: { label: "Linked List" },
    position: { x: 450, y: 200 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "7",
    data: { label: "Trees" },
    position: { x: 400, y: 300 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "8",
    data: { label: "Tries" },
    position: { x: 300, y: 400 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "9",
    data: { label: "Heap / Priority Queue" },
    position: { x: 300, y: 500 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "10",
    data: { label: "Greedy" },
    position: { x: 200, y: 600 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "11",
    data: { label: "Intervals" },
    position: { x: 400, y: 600 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "12",
    data: { label: "Backtracking" },
    position: { x: 500, y: 400 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "13",
    data: { label: "Graphs" },
    position: { x: 500, y: 500 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "14",
    data: { label: "Advanced Graphs" },
    position: { x: 500, y: 700 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "15",
    data: { label: "1-D DP" },
    position: { x: 700, y: 500 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "16",
    data: { label: "2-D DP" },
    position: { x: 700, y: 600 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "17",
    data: { label: "Bit Manipulation" },
    position: { x: 900, y: 700 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
  {
    id: "18",
    data: { label: "Math & Geometry" },
    position: { x: 700, y: 700 },
    style: {
      background: "#1E3A8A",
      color: "#FFFFFF",
      borderRadius: "8px",
      padding: "10px",
    },
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e2-5", source: "2", target: "5" },
  { id: "e3-6", source: "3", target: "6" },
  { id: "e5-7", source: "4", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
  { id: "e8-9", source: "8", target: "9" },
  { id: "e9-10", source: "9", target: "10" },
  { id: "e9-11", source: "9", target: "11" },
  { id: "e7-12", source: "7", target: "12" },
  { id: "e12-13", source: "12", target: "13" },
  { id: "e13-14", source: "13", target: "14" },
  { id: "e12-15", source: "12", target: "15" },
  { id: "e15-16", source: "15", target: "16" },
  { id: "e16-17", source: "16", target: "17" },
  { id: "e16-18", source: "16", target: "18" },
];

export default function Roadmap({ problemsData }) {
  // States for progress, notes, and last updated dates
  const [completedProblems, setCompletedProblems] = useState(() => {
    const savedState = localStorage.getItem("completedProblems");
    return savedState ? JSON.parse(savedState) : {};
  });

  const [lastUpdated, setLastUpdated] = useState(() => {
    const savedState = localStorage.getItem("lastUpdated");
    return savedState ? JSON.parse(savedState) : {};
  });

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("problemNotes");
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  const [selectedTopic, setSelectedTopic] = useState(null); // Stores the currently selected topic

  // Persist data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(
      "completedProblems",
      JSON.stringify(completedProblems)
    );
  }, [completedProblems]);

  useEffect(() => {
    localStorage.setItem("lastUpdated", JSON.stringify(lastUpdated));
  }, [lastUpdated]);

  useEffect(() => {
    localStorage.setItem("problemNotes", JSON.stringify(notes));
  }, [notes]);

  // Handle topic selection (when a node is clicked)
  const handleNodeClick = (_, node) => {
    setSelectedTopic(node.data.label);
  };

  // Toggle completion state for a problem (using problem title as key)
  const handleCheckboxChange = (topic, problemName) => {
    setCompletedProblems((prev) => {
      const updatedState = {
        ...prev,
        [topic]: {
          ...prev[topic], // Retain existing entries for this topic
          [problemName]: !prev[topic]?.[problemName], // Toggle completion state for this problem
        },
      };
      return updatedState;
    });
  };

  // Update the last solved date for a problem
  const handleUpdateDate = (topic, problemName) => {
    const newDate = new Date().toLocaleString(); // Current timestamp
    setLastUpdated((prev) => {
      const updatedState = {
        ...prev,
        [topic]: {
          ...prev[topic],
          [problemName]: newDate, // Update date for this problem
        },
      };
      return updatedState;
    });
  };

  // Reset the last solved date for a problem
  const handleResetDate = (topic, problemName) => {
    setLastUpdated((prev) => {
      const updatedState = {
        ...prev,
        [topic]: {
          ...prev[topic],
          [problemName]: null, // Reset the date
        },
      };
      return updatedState;
    });
  };

  // Update notes for a specific problem
  const handleNoteChange = (problemName, value) => {
    if (selectedTopic) {
      setNotes((prevNotes) => {
        const updatedNotes = {
          ...prevNotes,
          [selectedTopic]: {
            ...prevNotes[selectedTopic], // Retain notes for this topic
            [problemName]: value, // Update note for this problem
          },
        };
        return updatedNotes;
      });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-black text-white">
      {/* Roadmap Visualization */}
      <div className="w-3/4 h-screen p-6 bg-gray-800 shadow-lg rounded-lg border border-blue-500">
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} />
      </div>

      {/* Sidebar for Problems */}
      <div className="w-1/4 h-screen p-6 bg-gradient-to-b from-blue-800 to-gray-800 overflow-y-auto shadow-xl rounded-lg border border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">
          {selectedTopic || "Select a Topic"}
        </h2>
        {selectedTopic && problemsData[selectedTopic] ? (
          <ul className="space-y-4">
            {problemsData[selectedTopic].map((problem) => (
              <li
                key={problem.title}
                className="p-4 bg-gray-900 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg flex items-start"
              >
                {/* Checkbox for Completion */}
                <input
                  type="checkbox"
                  className="mr-2 mt-1 text-blue-500 ring-blue-300 focus:ring-2"
                  checked={
                    completedProblems[selectedTopic]?.[problem.title] || false
                  }
                  onChange={() =>
                    handleCheckboxChange(selectedTopic, problem.title)
                  }
                />
                <div>
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-blue-200 hover:text-blue-400 hover:underline font-medium"
                  >
                    {problem.title}
                  </a>
                  <div className="mt-2 text-sm text-gray-400">
                    <p>
                      <strong>Difficulty:</strong>{" "}
                      <span
                        className={
                          problem.difficulty === "Easy"
                            ? "text-green-400"
                            : problem.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }
                      >
                        {problem.difficulty || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong>Frequency:</strong> {problem.frequency || "N/A"}
                    </p>
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold">
                        Last Updated Date:
                      </h4>
                      <p className="text-gray-400">
                        {lastUpdated[selectedTopic]?.[problem.title] || "null"}
                      </p>
                      <button
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        onClick={() =>
                          handleUpdateDate(selectedTopic, problem.title)
                        }
                      >
                        Update Date
                      </button>
                      <button
                        className="mt-2 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                        onClick={() =>
                          handleResetDate(selectedTopic, problem.title)
                        }
                      >
                        Reset Date
                      </button>
                    </div>
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    <textarea
                      rows="3"
                      className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-md focus:outline-none resize-none"
                      placeholder="Write your notes here..."
                      value={notes[selectedTopic]?.[problem.title] || ""}
                      onChange={(e) =>
                        handleNoteChange(problem.title, e.target.value)
                      }
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No problems available for this topic.</p>
        )}
      </div>
    </div>
  );
}
