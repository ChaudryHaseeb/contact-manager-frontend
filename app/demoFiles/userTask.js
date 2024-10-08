// pages/user/task.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserTask({ taskId }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`/api/tasks/${taskId}`);
        setTask(data);
      } catch (error) {
        console.error("Failed to load task data", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const confirmCompletion = async () => {
    try {
      await axios.put(`/api/tasks/${taskId}/confirm`);
      alert("Task confirmed as completed!");
    } catch (error) {
      console.error("Failed to confirm task", error);
    }
  };

  if (!task) return <div>Loading task...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl mb-6">Assigned Task</h2>
      <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
        <p>
          <strong>Description:</strong> {task.description}
        </p>
        <p>
          <strong>Hourly Rate:</strong> ${task.hourlyRate}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
      </div>
      <button
        onClick={confirmCompletion}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={task.completionConfirmedByUser}
      >
        {task.completionConfirmedByUser
          ? "Task Completed"
          : "Confirm Task Completion"}
      </button>
    </div>
  );
}
