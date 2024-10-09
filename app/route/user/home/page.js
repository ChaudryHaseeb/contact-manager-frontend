"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Admin = () => {
    const router = useRouter();
    const [taskId, setTaskId] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
          const token = localStorage.getItem("token")?.replace(/'/g, "");
          if (!token) {
            console.error("Token not found");
            return;
          }
    
          try {
            const response = await fetch(
              `http://localhost:8080/api/task/${taskId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            if (data && data.taskId) {
                setTaskId(data.taskId); // Dynamically set the task ID
              }
          } catch (error) {
            console.error("Failed to load task data", error);
          }
        };
    
        fetchTask();
      }, [taskId]);
      const handleLinkClick = () => {
        if (taskId) {
          router.push(`/route/user/viewTask/${taskId}`);
        } else {
          alert("Task ID is not available");
        }
      };
  return (

  
    <div>
        <Navbar/>
      <section className="text-gray-300 body-font bg-[url('/admin3.avif')] bg-cover ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center mx-auto">
            <div className="flex items-center ">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                 Contact Manager
              </h1>
              <Image
                src="/Layers-Gradient.gif"
                alt="Pencil Gif"
                unoptimized
                width={55}
                height={55}
                className="object-contain pb-2 ml-3"
              />
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-400">
              "Take control of your contacts with advanced features designed for
              efficient your oversight."
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2 md:w-full">
              <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0">
                  <Image
                    src="/Admin-Contact-Gradient.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                    className="aspect-auto object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Add Contact
                  </h2>
                  <p className="leading-relaxed text-base text-gray-400">
                    "Add Your Contacts Here Or Centralize and Manage Contacts Effortlessly."
                  </p>
                  <Link
                    className="mt-3 text-indigo-600 inline-flex items-center"
                    href="/route/user/addContact"
                    >
                    Want To Add Contact?
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2 md:w-full">
              <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0">
                  <Image
                    src="/Admin-Contacts-Gradient.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                    />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Contact's Detail's
                  </h2>
                  <p className="leading-relaxed text-base text-gray-400">
                    "View Your All Contacts Here And  Manage Them For Optimal Organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-600 inline-flex items-center"
                    href="/route/user/viewContacts"
                    >
                    Show Contacts
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2 md:w-full">
              <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0">
                  <Image
                    src="/Admin-Contacts-Gradient.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                    />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                    Task Detail's
                  </h2>
                  <p className="leading-relaxed text-base text-gray-400">
                    "View Your All Tasks Here And  Manage Them For Optimal Organization."
                  </p>
                    <Button onClick={handleLinkClick} className='bg-slate-700 mt-4'>
                            Show Task
                    </Button>
                  {/* <Link
                    className="mt-3 text-indigo-600 inline-flex items-center"
                    
                  >
                    Show My Task's
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
