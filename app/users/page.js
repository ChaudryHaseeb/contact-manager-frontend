"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/allusers?page=${pageNumber}&limit=4`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users || []); 
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error(error.message || "Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (user_Id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");

      try {
        const response = await fetch(
          `http://localhost:8080/api/user/${user_Id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("user id ==========", user_Id);

        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user._id !== user_Id));
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error(error.message || "Error deleting user");
      }
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto p-4 max-h-lvh bg-[url('/Admin-User-Management3.webp')] bg-cover bg-center h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold mt-28 mb-6">
          Users Management
        </h1>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-center text-black">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-500 bg-white">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <Button
                    onClick={() => handleDelete(user._id)}
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      <Pagination className={"mt-10"}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={"cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive
              className={"bg-white text-black hover:bg-black hover:text-white"}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className={" text-white"} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={"cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Page;
