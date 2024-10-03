'use client'
// import { Button } from '@/components/ui/button'
import React, {useState, useEffect} from 'react'
import jsPDF from 'jspdf'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  


const ExportContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [role, setRole] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    
    
    //---------------------------------------- API Fetch ------------------------------------------
    
    const fetchContacts = async (pageNumber) =>{
        const token = localStorage.getItem('token')?.replace(/"/g,"");
        const userRole = await JSON.parse(localStorage.getItem("role")); 
        console.log('UserRole GET-----------------',userRole);
        setRole(userRole);
        console.log('Role SET-----------------',role);
        
        if (!token) {
            toast.error('User is not authorized');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/contacts?page=${pageNumber}&limit=2`,{
                method : "GET",
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            console.log('response-------------',response);
            if (!response.ok) {
                toast.error('Error in fetching contacts');
                return;
            }

            const data = await response.json();
            setContacts(data.contacts || []);
            setTotalPages(data.totalPages || 1);


        } catch (error) {
            toast.error('Failed to fetch the contacts');
        }
    }


    
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


    //----------------------------------------PDF function-------------------------------------------------

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



    useEffect(() => {
        // Wait for the role to be set before fetching contacts
        if (role) {
          fetchContacts(page);
        } else {
          const userRole = JSON.parse(localStorage.getItem("role"));
          setRole(userRole); // Set role only once after getting it from local storage
        }
      }, [role, page]); // Fetch contacts when role is set


      const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
      };
    
      const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
      };

  return (
    
    <>
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
       {/* <div className="pagination-controls">
        <button  onClick={handlePreviousPage}>
          Previous
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button  onClick={handleNextPage}>
          Next
        </button>
      </div> */}
      
    <DropdownMenu  >
    <DropdownMenuTrigger className = 'flex ml-auto mt-12 bg-white text-black rounded-sm p-2'>Download</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Contact's Download</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick = {downloadCSV} className='cursor-pointer hover:bg-slate-600'>CSV File</DropdownMenuItem>
      <DropdownMenuItem onClick = {downloadPDF} className='cursor-pointer hover:bg-slate-800'>PDF File</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  </>
  )
}

export default ExportContacts
