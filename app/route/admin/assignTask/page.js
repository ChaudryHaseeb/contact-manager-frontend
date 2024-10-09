'use client'
import { useState } from "react";
// import axios from "axios";
import Navbar from "@/components/layout/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSelect from "@/components/hook/SelectHook";

export default function AssignTask() {
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const handleSubmit = async (e) => {
    const token = localStorage.getItem('token')?.replace(/"/g,'');
    // const role = localStorage.getItem('role');
    if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
  
      }
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/task/assign", {
        method : 'POST',
        headers: {
            'Content-Type':'application/json',
            Authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            description,
            assignedTo,
            hourlyRate,
        })
        
      });
      if(!response.ok){
        throw new Error('Response is not ok');
      };
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Failed to assign task", error);
    }
  };

  return (
    <>
    <Navbar/>

    <div className="p-8 max-w-lg mx-auto mt-16">
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
      <h2 className="text-2xl mb-6">Assign Task to User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Task Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Assign To (User ID):</label>
          {/* <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border p-2 w-full text-black"
            required
          /> */}
          <CustomSelect onChange={(selectedUserId) => setAssignedTo(selectedUserId)}/>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Hourly Rate:</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="border p-2 w-full text-black"
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
    </>
  );
}
