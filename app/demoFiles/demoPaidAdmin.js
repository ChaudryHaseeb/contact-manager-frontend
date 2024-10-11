import React, { useState, useEffect } from 'react';
import { getTasksWithPaymentStatus } from '../../services/apiService';

const ViewAmount = () => {
  const [tasks, setTasks] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);  // New state for total paid amount

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { tasks, totalPaid } = await getTasksWithPaymentStatus();  // Destructure totalPaid
        setTasks(tasks);
        setTotalPaid(totalPaid);  // Set the total paid amount
      } catch (error) {
        console.error('Error fetching tasks with payment status:', error);
      }
    };
    
    fetchTasks();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Task Payment Details</h1>

      {/* Display the sum of all paid amounts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Total Amount Paid: ${totalPaid}</h2>
      </div>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Task Description</th>
            <th className="text-left p-4">Hourly Rate</th>
            <th className="text-left p-4">Payment Status</th>
            <th className="text-left p-4">Amount Paid</th>
            <th className="text-left p-4">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className="border-b">
              <td className="p-4">{task.description}</td>
              <td className="p-4">${task.hourlyRate}</td>
              <td className="p-4">{task.paymentStatus}</td>
              <td className="p-4">${task.amountPaid}</td>
              <td className="p-4">{task.paidAt ? new Date(task.paidAt).toLocaleDateString() : 'Not Paid'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAmount;
