"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useParams } from "next/navigation";

export default function UserTask() {
  const params = useParams();
  const taskId = params.task;  

  const [task, setTask] = useState(null);
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
        setTask(data);
        console.log("task:", task);
      } catch (error) {
        console.error("Failed to load task data", error);
      }
    };

    fetchTask();
  }, [taskId]);

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

  if (!task) return <div>Loading task...</div>;

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-lg mx-auto mt-28 mb-36">
        <h2 className="text-2xl mb-6">Assigned Task</h2>
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6 text-black">
          <p>
            <strong>Description:</strong> {task.description}
          </p>
          {console.log("description------", task.description)}
          <p>
            <strong>Hourly Rate:</strong> ${task.hourlyRate}
          </p>
          {console.log("description------", task.hourlyRate)}

          <p>
            <strong>Status:</strong> {task.status}
          </p>
          {console.log("description------", task.status)}
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
    </>
  );
}
