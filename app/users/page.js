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
import jsPDF from 'jspdf';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "../components/Navbar";

const Page = () => {

      //---------------------------------------- CONSTANTS DICLARAIION ------------------------------------------

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2); 


      //---------------------------------------- FETCH  USER FUNCTION ------------------------------------------

  const fetchUsers = async (pageNumber) => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;
    }

        //---------------------------------------- API Fetch GET ------------------------------------------


    try {
      const response = await fetch(
        `http://localhost:8080/api/user/allusers?page=${pageNumber}&limit=${limit}`,
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

      //---------------------------------------- USE EFFECT ------------------------------------------

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

      //---------------------------------------- HANDLE LIMIT CHANGE FUNCTION ------------------------------------------
  
      const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
        setPage(1); // Reset to first page when the limit is changed
      };

      //---------------------------------------- HANDLE DELETE FUNCTION ------------------------------------------


  const handleDelete = async (user_Id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token")?.replace(/"/g, "");

          //---------------------------------------- API Fetch DELETE ------------------------------------------

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

      //---------------------------------------- HANDLE NEXT PAGE FUNCTION ------------------------------------------

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

      //---------------------------------------- HANDLE PREVIOUSE PAGE FUNCTION ------------------------------------------

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
      if (users.length === 0) {
          toast.error('No Contacts')
      }
      const csvData = convertToCSV(users);
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
    if(users.length === 0){
        toast.error('No Contacts')
    }
    const doc = new jsPDF();

    //title
    doc.setFontSize(18)
    doc.text('Users List', 85, 20)

    let ypos = 40;

    //header
    doc.setFontSize(16);
    doc.text('Name', 25, ypos);
    doc.text('Email', 80, ypos);
    doc.text('Role', 150, ypos);

    ypos += 10;

    //body
    users.forEach(user => {
        doc.setFontSize(12)
        doc.text(user.username, 20, ypos);
        doc.text(user.email, 70, ypos);
        doc.text(user.role, 150, ypos);

        doc.line(20,ypos + 2, 190, ypos + 2);

        ypos += 10;
    });

    doc.save('users.pdf');

 }

  return (
    <>
     <Navbar/>
    <div className="container mx-auto p-4 bg-[url('/Admin-User-Management3.webp')] bg-cover bg-center min-h-screen">
      <div className="flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold mt-16 mb-1">
          Users Management
        </h1>
      </div>

           {/*-------------------------------- DROP_DOWN Buttom --------------------------------------*/}

           <DropdownMenu  >
    <DropdownMenuTrigger className = 'flex ml-auto bg-white text-black rounded-sm p-2'>Download</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>User's Download</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick = {downloadCSV} className='cursor-pointer hover:bg-slate-600'>CSV File</DropdownMenuItem>
      <DropdownMenuItem onClick = {downloadPDF} className='cursor-pointer hover:bg-slate-800'>PDF File</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>


      {/* //---------------------------------------- TABLE DATA DISPLAY ------------------------------------------ */}


      <div className="overflow-x-auto mt-6 min-h-[200px]">
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

{/* //---------------------------------------- PAGINATION ------------------------------------------ */}

               {/*-------------------------------- Limit Dropdown ----------------------------*/}


      <Pagination className={"flex justify-center items-center mt-10 gap-72"}>
      <div className="flex justify-center items-center">
        <label htmlFor="limit" className="mr-2 p-2 bg-white text-black rounded-sm">Items per page:</label>
        <select
          id="limit"
          className="border rounded text-black p-2"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
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
        <span className="mt-2 ml-auto">{`Page ${page} of ${totalPages}`}</span>
      </Pagination>
    </div>
    </>
  );
};

export default Page;