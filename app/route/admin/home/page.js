"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
// import AdminDashboard from "../../../../components/layout/AdminDashboard";
// import Component from "@/app/demoFiles/demoCard";
import CardPaymentDetails from "@/components/card/CardPaymentDetails";
import CardTaskDetails from "@/components/card/CardTaskDetails";

const Admin = () => {
  return (

    <div>
        <Navbar/>
      <section className="text-gray-400 body-font bg-[url('/admin3.avif')] bg-cover ">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full mb-6 flex-col items-center text-center mx-auto">
            <div className="flex items-center ">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                Admin Contact Manager
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
              efficient admin oversight."
            </p>
          </div>
          <div className=" p-8 min-h-screen">
               <h2 className="text-3xl font-semibold mb-8">Admin Dashboard</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex-row"><CardPaymentDetails/></div>
                <div className="flex-row "><CardTaskDetails/></div>
                </div>
               
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
                    User's Detail's
                  </h2>
                  <p className="leading-relaxed text-base">
                    "Centralize and manage contacts effortlessly, giving admins
                    the insights they need to succeed."
                  </p>
                  <Link
                    className="mt-3 text-indigo-500 inline-flex items-center"
                    href="/route/admin/usersData"
                  >
                    Show Users
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
                  <p className="leading-relaxed text-base">
                    "Streamline your contact management process with powerful
                    admin tools for optimal organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-500 inline-flex items-center"
                    href="/route/admin/userContacts"
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
                    src="/Computer-Display-Gradient.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                   Assign User Task 
                  </h2>
                  <p className="leading-relaxed text-base">
                    "Streamline your contact management process with powerful
                    admin tools for optimal organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-500 inline-flex items-center"
                    href="/route/admin/assignTask"
                  >
                    Assign Task To User
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
                    src="/Document-Task-Gradient.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                   User Tasks List
                  </h2>
                  <p className="leading-relaxed text-base">
                    "Streamline your contact management process with powerful
                    admin tools for optimal organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-500 inline-flex items-center"
                    href="/route/admin/taskData"
                  >
                    View Tasks
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
                    src="/Growth-Gradient2.gif"
                    alt="Logo"
                    unoptimized
                    width={80}
                    height={70}
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-white text-lg title-font font-medium mb-3">
                   Total Amount
                  </h2>
                  <p className="leading-relaxed text-base">
                    "Streamline your contact management process with powerful
                    admin tools for optimal organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-500 inline-flex items-center"
                    href="/route/admin/viewAmount"
                  >
                    View Total Amount
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
