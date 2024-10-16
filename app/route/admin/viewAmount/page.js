'use client'
import React, { useState, useEffect } from 'react';
import ApiService from '../../../config/service/apiConfig';
import Navbar from '@/components/layout/Navbar';
import { motion } from "framer-motion"

const ViewAmount = () => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnPaid, setTotalUnpaid] = useState(0);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const {task, TotalAmount, TotalAmountPaid, TotalAmountUnpaid} = await ApiService.getTasksWithPaymentStatus();
        setTasks(task);
        setTotal(TotalAmount);
        setTotalPaid(TotalAmountPaid);
        setTotalUnpaid(TotalAmountUnpaid)
      } catch (error) {
        console.error('Error fetching tasks with payment status:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
    <Navbar/>
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="p-8 max-w-4xl mx-auto mt-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Task Payment Details</h1>

      {/* Display the sum of all paid amounts */}

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="border-b border-t text-center text-[#ffd800]">
            <th className="text-center p-4 border-x-2 ">Task Description</th>
            <th className="text-center p-4 border-x-2">Hourly Rate</th>
            <th className="text-center p-4 border-x-2">Status</th>
            <th className="text-center p-4 border-x-2">Payment Status</th>
            <th className="text-center p-4 border-x-2">Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (tasks.map(task => (
            <tr key={task._id} className="border-b border-x-2">
              <td className="p-4 border-x-2">{task.description}</td>
              <td className="p-4 text-center border-x-2">{task.hourlyRate}$</td>
              <td className={`p-4 text-center border-x-2 ${task.status === 'complete' ? 'text-[#00ae0c]' : 'text-[#f60000]'}`}>{task.status}</td>
              <td className={`p-4 text-center border-x-2 ${task.paymentStatus === 'paid' ? 'text-[#00ae0c]' : 'text-[#f60000]'}`}>{task.paymentStatus}</td>
              <td className="p-4 text-center border-x-2">{task.amountPaid}$</td>
            </tr>
          ))) : (<tr>
            <td colSpan="5" className="p-4 text-center">No Amount to Show</td>
          </tr>) }
        </tbody>
      </table>
      <div className="mt-10 mb-10 flex gap-x-24">
        <h2 className="text-xl font-semibold text-blue-600">Total Amount: <span className="text-white ml-2 text-3xl">{total}$</span></h2>
        <h2 className="text-xl font-semibold text-[#00ae0c]">Total Amount Paid: <span className="text-white ml-2 text-3xl">{totalPaid}$</span></h2>
        <h2 className="text-xl font-semibold text-[#f60000]">Total Amount Un-paid: <span className="text-white ml-2 text-3xl">{totalUnPaid}$</span></h2>
      </div>
    </div>
    </motion.div>
    </>
  );
};

export default ViewAmount;

