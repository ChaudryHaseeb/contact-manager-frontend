"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/user/allusers", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch users");
        
        const data = await response.json();
        setUsers(data.users || []); // Extract users from the response
      } catch (error) {
        toast.error(error.message || "Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");

      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error(error.message || "Error deleting user");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-h-lvh bg-[url('/Admin-User-Management3.webp')] bg-cover bg-center h-screen"> 
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold mt-28 mb-6">Users Management</h1>
      </div>
      <ul className="mt-6">
        {/* {console.log('user===============',users)} */}
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center p-2 border-b text-white">
            <span>{user.username} ---- {user.email} ---- {user.role}</span>

            <Button onClick={() => handleDelete(user._id)} variant="destructive">
              Delete
            </Button>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default Page;
