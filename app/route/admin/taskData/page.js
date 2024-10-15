'use client';
import { useState, useEffect } from 'react';
import ApiService from "../../../config/service/apiConfig";
import Navbar from "@/components/layout/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUsersTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await ApiService.fetchUsersTask();
        if (response.status === 200) {
            setTasks(response.data.userTask);
        } else {
          console.error('Failed to fetch tasks:', response.statusText);
          toast.error('Failed to fetch users tasks');

        }
      } catch (error) {
        console.error('Server error:', error);
        toast.error('Server Error');

      }
    };

    fetchTasks();
}, []);

const confirmPayment=async(taskId) => {
    try {
        const response = await ApiService.confirmationPayment(taskId);
        if (response.status === 200) {
            const updatedTasksResponse = await ApiService.fetchUsersTask();
            setTasks(updatedTasksResponse.data.userTask)
            toast.success('Payment Successfull');
        } else {
            console.error('Failed User Payment ', response.statusText);
            toast.error('Failed User Payment');
        }
    } catch (error) {
        console.error('Server error:', error);
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
              <p><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Hourly Rate:</strong> ${task.hourlyRate}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Task ID:</strong> {task._id}</p>
              <p><strong>Payment Status:</strong> {task.paymentStatus}</p>

              <button
                onClick={()=> confirmPayment(task._id)}
                className={`bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 cursor-pointer ${task.paidByAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={task.paidByAdmin}
              >
                {task.paidByAdmin ? "Paid" : "Pay Now" }
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

export default AllUsersTasks;
