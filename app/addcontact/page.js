"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';

const Management = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [contacts, setContacts] = useState([]);
  const [role, setRole] = useState(null); 

  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      const userRole = JSON.parse(localStorage.getItem('role')); 
      setRole(userRole);
      // console.log('setRole==========',userRole);

      if (!token) {
        toast.error("You are not authorized. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/contacts", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch contacts");
        const data = await response.json();
        setContacts(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error.message || "Error fetching contacts");
      }
    };
    fetchContacts();
  }, []);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    
    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      // console.log('contact-response--------',response)

      if (!response.ok) throw new Error("Failed to add contact");

      const newContact = await response.json();
      setContacts([...contacts, { _id: newContact._id, ...data }]);
      reset();
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error(error.message || "Error adding contact");
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      
      try {
        const response = await fetch(`http://localhost:8080/api/contacts/${_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to delete contact");
        // console.log('resspone=========',response);

        setContacts(contacts.filter((contact) => contact._id !== _id));
        toast.success("Contact deleted!");
      } catch (error) {
        toast.error(error.message || "Error deleting contact");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-h-lvh bg-[url('/Login.avif')] bg-cover">
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
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold mt-28 mb-6">Contact Management</h1>
        <Image src="/Document-Gradient.gif" alt="Document Gif" unoptimized width={40} height={40} className='object-contain pb-6 ml-3 mt-28'/>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="p-2 border rounded w-full"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="p-2 border rounded w-full"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <input
            {...register("number", { required: "Number is required" })}
            placeholder="Number"
            className="p-2 border rounded w-full"
          />
          {errors.number && <span className="text-red-500">{errors.number.message}</span>}
        </div>
        <Button type="submit" variant="default" disabled={isSubmitting}>
          Add Contact
        </Button>
      </form>

      <ul className="mt-6">
        {contacts.map((contact) => (
          <li key={contact._id} className="flex justify-between items-center p-2 border-b text-white">
            <span>{contact.name} - {contact.email} - {contact.number}</span>
            {/* {console.log("role============",role)} */}
            {role === "user" && (
              <Button onClick={() => handleDelete(contact._id)} variant="destructive">
              Delete
            </Button>
            ) }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Management;

