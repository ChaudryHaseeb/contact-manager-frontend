// pages/admin/assign-task.js
import { useState } from "react";
import axios from "axios";

export default function AssignTask() {
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/tasks/assign", {
        description,
        assignedTo,
        hourlyRate,
      });
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Failed to assign task", error);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl mb-6">Assign Task to User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Task Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Assign To (User ID):</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hourly Rate:</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
}
