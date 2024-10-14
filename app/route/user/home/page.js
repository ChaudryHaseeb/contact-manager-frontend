"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import UserPaymentCard from "@/components/card/UserPaymentCard";
import UserTaskCard from "@/components/card/UserTaskCard";


const Admin = () => {
  return (
    <div>
        <Navbar/>
      <section className="text-gray-300 body-font [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] bg-cover ">
        <div className="container px-5 py-20 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center mx-auto">
            <div className="flex items-center ">
              <h1 className="sm:text-4xl text-2xl title-font mb-2 text-white font-bold">
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
          <div className=" min-h-screen mb-18">
                  <h2 className="text-2xl font-semibold mb-8 ml-8">User Dashboard</h2>
            <div className="flex">
                <div className="flex-row ml-24"><UserPaymentCard/></div>
                <div className="flex-row ml-10"><UserTaskCard/></div>
            </div>

            </div>
            <div className="flex items-center mx-auto mb-16">
                <h2 className="text-3xl font-bold text-white">User Controller's</h2>
                <Image
                src="/Layers-Gradient.gif"
                alt="Pencil Gif"
                unoptimized
                width={55}
                height={55}
                className="object-contain pb-2 ml-3"
              />
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
                    src="/Computer-Display-Gradient.gif"
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
                  <Link
                    className="mt-3 text-indigo-600 inline-flex items-center"
                    href={'/route/user/userTasks'}
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
                    Earning Detail's
                  </h2>
                  <p className="leading-relaxed text-base text-gray-400">
                    "View Your All Tasks Here And  Manage Them For Optimal Organization."
                  </p>
                  <Link
                    className="mt-3 text-indigo-600 inline-flex items-center"
                    href={'/route/user/viewEarnAmount'}
                  >
                    Show My Earn Amount
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
