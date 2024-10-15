'use client';
import { useState, useEffect } from 'react';
import ApiService from "../../../config/service/apiConfig";
import Navbar from "@/components/layout/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await ApiService.fetchAllTasks();
        if (response.status === 200) {
          setTasks(response.data.userTask);
        } else {
          toast.error('Failed To Fetch Your All Tasks');

        }
      } catch (error) {
        toast.error('Server Error');

      }
    };

    fetchTasks();
  }, []);



  const confirmCompletion = async (taskId) => {
    try {
      const response = await ApiService.confirmationTasks(taskId);
      if (response.status === 200) {
        const updatedTasks = await ApiService.fetchAllTasks();
        setTasks(updatedTasks.data.userTask);
        toast.success('Time Started');

      } else {
        toast.error('Failed to start task');

      }
    } catch (error) {
      toast.error('Server Error');

    }
  };


  const Completion = async (taskId) => {
    try {
      const response = await ApiService.completionTask(taskId);
      if (response.status === 200) {
        const updatedTasks = await ApiService.fetchAllTasks();
        setTasks(updatedTasks.data.userTask);
        toast.success('Complete Task Successfully');

      } else {
        toast.error('Failed to complete task');

      }
    } catch (error) {
      toast.error('Server Error');

    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="p-8 max-w-lg mx-auto mt-28 mb-36">
        <h2 className="text-2xl mb-6">Assigned Tasks</h2>

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="bg-gray-100 p-4 rounded shadow-md mb-6 text-black">
              <p><strong>Assigned To:</strong> {task.assignedTo.username} ({task.assignedTo.email})</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Hourly Rate:</strong> ${task.hourlyRate}</p>
              <p><strong>Status:</strong> {task.status}</p>

              <button
                onClick={() => confirmCompletion(task._id)}
                className={`bg-green-600 text-white px-4 py-2 rounded mt-4 mr-4 hover:bg-green-700 cursor-pointer ${task.completionConfirmedByUser ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={task.completionConfirmedByUser}
              >
                {task.completionConfirmedByUser
                  ? "Started"
                  : "Start"
                }
              </button>
              <button
                onClick={() => Completion(task._id)}
                className={`bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 cursor-pointer ${task.completeByUser ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={task.completeByUser}
              >
                {task.completeByUser
                  ? "Completed"
                  : "Confirm Completion"
                }
              </button>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </>
  );
};

export default UserTasks;
