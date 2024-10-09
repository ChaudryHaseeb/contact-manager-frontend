"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useParams } from "next/navigation";

export default function UserTask() {
  const params = useParams();
  const taskId = params.task;  

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); 

  console.log("task id------", taskId);
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token")?.replace(/'/g, "");
      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/task/${taskId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const data = await response.json();

        console.log('data---------------', data);

        if (data) {
            setTask(data);
            setLoading(false);
          }
  

    } catch (error) {
        console.error("Failed to load task data", error);
        setLoading(false);
    }
};

fetchTask();
}, [taskId]);

// console.log("task:----------------", task);
  const confirmCompletion = async () => {
    try {
      const token = localStorage.getItem("token")?.replace(/'/g, "");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await fetch(`http://localhost:8080/api/task/${taskId}/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('response is not ok..')
      }
      console.log('response-----------------',response)

      const data = await response.json();
      console.log('response data---------',data);

    //   alert("Task confirmed as completed!");
      setTask((prevTask) => ({
        ...prevTask,
        completionConfirmedByUser: true,
      }));
    } catch (error) {
      console.error("Failed to confirm task", error);
    }
  };

  if (loading) return <div>Loading task...</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-lg mx-auto mt-28 mb-36">
        <h2 className="text-2xl mb-6">Assigned Task</h2>
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6 text-black">
          <p>
            <strong>Description:</strong> {task[0].description}
          </p>
          <p>
            <strong>Hourly Rate:</strong> ${task[0].hourlyRate}
          </p>

          <p>
            <strong>Status:</strong> {task[0].status}
          </p>
        </div>
        <button
          onClick={confirmCompletion}
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={task[0].completionConfirmedByUser}
        >
          {task[0].completionConfirmedByUser
            ? "Task Completed"
            : "Confirm Task Completion"}
        </button>
      </div>
    </>
  );
}
