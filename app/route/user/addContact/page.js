"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import jsPDF from 'jspdf';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion"


const Management = () => {

      //---------------------------------------- CONSTANTS DICLARATION ------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [contacts, setContacts] = useState([]);
  const [role, setRole] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [editingContactId, setEditingContactId] = useState(null);
  const [updatedContact, setUpdatedContact] = useState({
    name : '',
    email : '',
    number : '',
  });

    //---------------------------------------- FETCH CONTACT FUNCTION ------------------------------------------


  const fetchContacts = async (pageNumber) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    const userRole = JSON.parse(localStorage.getItem("role"));
    setRole(userRole);

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;

    }
    //---------------------------------------- API Fetch GET ------------------------------------------

    try {
      const response = await fetch(
        `http://localhost:8080/api/contacts?page=${pageNumber}&limit=${limit}`,
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

  //------------------------------------------ USE EFFECT -------------------------------

  useEffect(() => {
    fetchContacts(page, limit);
  }, [page, limit]);

    //---------------------------------------- HANDLE LIMIT CHANGE FUNCTION ------------------------------------------

    const handleLimitChange = (event) => {
      setLimit(Number(event.target.value));
      setPage(1);
    };

  //------------------------------------ ONSUBMIT FUNCTION ---------------------------------

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");

        //---------------------------------------- API Fetch POST ------------------------------------------

    try {
      const response = await fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add contact");

      const newContact = await response.json();
      setContacts([...contacts, { _id: newContact._id, ...data }]);
      reset();
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error(error.message || "Error adding contact");
    }
  };

      //---------------------------------------- HANDLE PUT FUNCTION ------------------------------------------

          const handleEdit = (contact) => {
            setEditingContactId(contact._id);
            setUpdatedContact({
              name : contact.name,
              email : contact.email,
              number : contact.number,
            });
          };


          const handleInputChange = (e) =>{
            const {name, value} = e.target;

            setUpdatedContact((prevState)=>({
              ...prevState,
              [name] : value,
            })
          );
          };


          const handleUpdate = async (contactId) =>{
            const token = localStorage.getItem('token')?.replace(/"/g,"");
            try {
              const response = await fetch(`http://localhost:8080/api/contacts/${contactId}`,
                {
                  method : 'PUT',
                  headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${token}`,
                  },
                  body : JSON.stringify(updatedContact),
                }
              );

              if (!response.ok) {
                throw new Error('Failed to update contact');
              };

              const updatedData = await response.json();
              console.log('Updated contact:', updatedData);


              setContacts((prevContacts)=> prevContacts.map((contact)=>
                contact._id === contactId ? {...contact, ...updatedContact} : contact
              )
            );

            setEditingContactId(null);
            toast.success('Contact updated successfull!')
            } catch (error) {
              toast.error('Error in updating the contact');
            }
          }



      //---------------------------------------- HANDLE DELETE FUNCTION ------------------------------------------


  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");

          //---------------------------------------- API Fetch DELETE ------------------------------------------

      try {
        const response = await fetch(
          `http://localhost:8080/api/contacts/${_id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to delete contact");

        setContacts(contacts.filter((contact) => contact._id !== _id));
        toast.success("Contact deleted!");
      } catch (error) {
        toast.error(error.message || "Error deleting contact");
      }
    }
  };

      //---------------------------------------- HANDLE NEXT PAGE FUNCTION ------------------------------------------

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

      //---------------------------------------- HANDLE PREVIOUSE PAFE FUNCTION ------------------------------------------


  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };


  //--------------------------------------- CSV Function ---------------------------------------

    //convert json data to csv formate

    const convertToCSV = (data) => {
      if (!data.length) {
          return '';
      }
      const csvRows = [];

      //get header

      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(','));

      //loops through each contact and push contact to csv rows

      for (const row of data) {
          const values = headers.map(header => `${row[header]}`);
          csvRows.push(values.join(','));
      };

      return csvRows.join('\n');
  };

  // trigger download for csv
      //---------------------------------------- DOWNLOAD CSV FUNCTION ------------------------------------------


  const downloadCSV = () =>{
      if (contacts.length === 0) {
          toast.error('No Contacts')
      }
      const csvData = convertToCSV(contacts);
      const blob = new Blob([csvData],{type: "text/csv"});
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', 'contact.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  };


  //---------------------------------------- DOWNLOAD PDF FUNCTION -------------------------------------------------

  const downloadPDF = () =>{
    if(contacts.length === 0){
        toast.error('No Contacts')
    }
    const doc = new jsPDF();

    //title
    doc.setFontSize(18)
    doc.text('Contacts List', 70, 20)

    let ypos = 40;

    //header
    doc.setFontSize(16);
    doc.text('Name', 25, ypos);
    doc.text('Email', 80, ypos);
    doc.text('Phone', 143, ypos);

    ypos += 10;

    //body
    contacts.forEach(contact => {
        doc.setFontSize(12)
        doc.text(contact.name, 20, ypos);
        doc.text(contact.email, 70, ypos);
        doc.text(contact.number, 140, ypos);

        doc.line(20,ypos + 2, 190, ypos + 2);

        ypos += 10;
    });

    doc.save('contacts.pdf');

}

  return (
    <>
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto mt-6 p-4 bg-[url('/Login.avif')] bg-cover min-h-screen">
      <Navbar/>
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

      <div className="flex items-center justify-center mt-8">
        <h1 className="text-white text-3xl font-bold mb-6">
          Contact Management
        </h1>
        <Image
          src="/Document-Gradient.gif"
          alt="Document Gif"
          unoptimized
          width={40}
          height={40}
          className="object-contain pb-6 ml-3"
        />
      </div>

      {/* //---------------------------------------- FORM INPUTS ------------------------------------------ */}


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-center text-black">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="p-2 border rounded w-1/2"
          />
          {errors.name && (
            <span className="text-red-500 ml-4">{errors.name.message}</span>
          )}
        </div>
        <div className="flex items-center justify-center text-black">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
            className="p-2 border rounded w-1/2"
          />
          {errors.email && (
            <span className="text-red-500 ml-4">{errors.email.message}</span>
          )}
        </div>
        <div className="flex items-center justify-center text-black">
          <input
            {...register("number", { required: "Number is required" ,
              pattern:{
                value: /^\d{11}$/,
                message: "Invalid number format"
              }
            })}
            placeholder="Number"
            className="p-2 border rounded w-1/2"
          />
          {errors.number && (
            <span className="text-red-500 ml-4">{errors.number.message}</span>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button
            className="w-1/4"
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            Add Contact
          </Button>
        </div>
      </form>


        {/*-------------------------------- DROP_DOWN Buttom --------------------------------------*/}

  <DropdownMenu  >
    <DropdownMenuTrigger className = 'flex ml-auto bg-white text-black rounded-sm p-2'>Download</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Contact's Download</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick = {downloadCSV} className='cursor-pointer hover:bg-slate-600'>CSV File</DropdownMenuItem>
      <DropdownMenuItem onClick = {downloadPDF} className='cursor-pointer hover:bg-slate-800'>PDF File</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>


  {/*------------------------------------------ TABLE DATA DISPLAY --------------------------------------- */}

      <div className="overflow-x-auto mt-6 min-h-[200px]">
        <table className="min-w-full bg-white text-black table-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Edit</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="border-b border-gray-500">
        <td className="py-2 px-4">
          {editingContactId === contact._id ? (
            <input
              name="name"
              value={updatedContact.name}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          ) : (
            contact.name
          )}
        </td>
        <td className="py-2 px-4">
          {editingContactId === contact._id ? (
            <input
              name="email"
              value={updatedContact.email}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          ) : (
            contact.email
          )}
        </td>
        <td className="py-2 px-4">
          {editingContactId === contact._id ? (
            <input
              name="number"
              value={updatedContact.number}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          ) : (
            contact.number
          )}
        </td>
        <td className="py-2 px-4">
          {editingContactId === contact._id ? (
            <Button onClick={() => handleUpdate(contact._id)} variant="default">
              Save
            </Button>
          ) : (
            <Button onClick={() => handleEdit(contact)} variant="destructive">
              Edit
            </Button>
          )}
        </td>
                  <td className="py-2 px-4">
                    {role === "user" && (
                      <Button
                        onClick={() => handleDelete(contact._id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    )}
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

      {/*------------------------------------------- Pagination ---------------------------------------*/}

              {/*-------------------------------- Limit Dropdown ----------------------------*/}



      <Pagination className="flex justify-center items-center mt-10 gap-72">
      <div className="flex justify-center items-center">
        <label htmlFor="limit" className="mr-2 p-2 bg-white text-black rounded-sm">Items per page:</label>
        <select
          id="limit"
          className="border rounded text-black p-2"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={5}>5</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>
        <PaginationContent className="">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={"cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive
              className="bg-white text-black hover:bg-black hover:text-white"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="text-white" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={"cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      <span className="mt-2 ml-auto">{`Page ${page} of ${totalPages}`}</span>
      </Pagination>

    </div>
    </motion.div>
    </>
  );
};

export default Management;