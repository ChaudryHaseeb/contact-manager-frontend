"use client";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
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
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchContacts = async (pageNumber) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/contacts/allcontacts?page=${pageNumber}&limit=4`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();
      setContacts(data.contacts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error(error.message || "Error fetching contacts");
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      // console.log("contact id---------", _id);
      try {
        const response = await fetch(
          `http://localhost:8080/api/contacts/admin/${_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("contact id---------", _id);
        if (!response.ok) throw new Error("Failed to delete contact");

        setContacts(contacts.filter((contact) => contact._id !== _id));
        toast.success("Contact deleted successfully!");
      } catch (error) {
        toast.error(error.message || "Error deleting contact");
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
          Contact Management
        </h1>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-gray-800 text-black table-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b bg-white border-gray-500"
                >
                  <td className="py-2 px-4">{contact.name}</td>
                  <td className="py-2 px-4">{contact.email}</td>
                  <td className="py-2 px-4">{contact.number}</td>
                  <td className="py-2 px-4">
                    <Button
                      onClick={() => handleDelete(contact._id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No contacts found.
                </td>
              </tr>
            )}
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
            <PaginationEllipsis className={"text-white"} />
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
