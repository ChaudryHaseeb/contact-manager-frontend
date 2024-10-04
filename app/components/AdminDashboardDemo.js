'using client'
// import axios from "axios";
// import { useState, useEffect } from "react";

export default function AdminDashboard() {
//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const { data } = await axios.get("/api/dashboard"); // Fetch data from your backend
//         setDashboardData(data);
//       } catch (error) {
//         console.error("Failed to load dashboard data", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (!dashboardData) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

  return (
    <div className="mx-auto align-middle p-8 bg-gray-950 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Total Users  */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-black">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-4xl mt-4 text-blue-600">Dashboard Data Total Users</p>
        </div>

        {/* Total Assign Tasks */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-black">
          <h3 className="text-lg font-semibold">Total Assign Tasks</h3>
          <p className="text-4xl mt-4 text-red-600">Dashboard Data Assign Task</p>
        </div>

        {/* Total Done Tasks */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-black">
          <h3 className="text-lg font-semibold">Total Done Tasks</h3>
          <p className="text-4xl mt-4 text-green-600">Dashboard Data Total Done Tasks</p>
        </div>
                {/* Total Pay Amount */}

        <div className="bg-white shadow-lg rounded-lg p-6 text-black">
          <h3 className="text-lg font-semibold">Total Pay Amount</h3>
          <p className="text-4xl mt-4 text-blue-950">Dashboard Data Total Pay Amount</p>
        </div>
      </div>

      {/* Recent Done Tasks */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Recent Done Tasks</h3>
        {/* <ul className="bg-white shadow-lg rounded-lg p-6">
          {dashboardData.recentContacts.map((contact) => (
            <li
              key={contact._id}
              className="flex justify-between py-3 border-b border-gray-200"
            >
              <span className="font-medium">{contact.name}</span>
              <span className="text-sm text-gray-500">
                Last updated: {new Date(contact.updatedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
