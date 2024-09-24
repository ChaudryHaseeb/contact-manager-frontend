"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8080/api/contacts/allcontacts", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('token======',{token})

        if (!response.ok) throw new Error("Failed to fetch contacts");
  
        const data = await response.json();
        // console.log('Fetched contacts:', data);
        setContacts(data.users || []); 
        // console.log('Contacts set:', data.contacts);
      } catch (error) {
        toast.error(error.message || "Error fetching contacts");
      }
    };
  
    fetchContacts();
  }, []);
  

  const handleDelete = async (_Id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");

      try {
        const response = await fetch(`http://localhost:8080/api/contacts/${_Id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete contact");
        setContacts(contacts.filter((contact) => contact._id !== _Id));
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error(error.message || "Error deleting contact");
      }
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-h-lvh bg-[url('/Admin-User-Management3.webp')] bg-cover bg-center h-screen"> 
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold mt-28 mb-6">Contact's Management</h1>
      </div>
      <ul className="mt-6">
  <table>
    <thead className="text-white">
      <tr className="flex justify-between items-center p-2 border-b">
        <th className="pl-16">Name</th>
        <th className="px-40" colSpan="2">Email</th>
        <th className="px-28" colSpan="3">Phone</th>
        <th className="pl-8">Actions</th> {/* Add a header for the actions */}
      </tr>
    </thead>
    <tbody className="items-start">
      {contacts.map((contact) => (
        <tr key={contact} className="flex justify-between items-center p-2 border-b text-white">
          <td className="pl-8">{contact.name}</td>
          <td className="px-40">{contact.email}</td>
          <td className="px-44">{contact.number}</td>
          <td>
              <Button onClick={() => handleDelete(contact._id)} variant="destructive">
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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