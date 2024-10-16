"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // Check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    setIsLoggedIn(!!token);
  };

  // Scroll handler
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    }
  };

  // useEffect to monitor scroll events and login status
  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        checkLoginStatus();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`transition-transform duration-300 fixed top-0 w-full bg-transparent z-10 flex flex-col md:flex-row md:justify-start justify-center items-center py-1 shadow-md ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="my-3 md:mx-5">
        <Link href={"/"}>
          <Image src="/Home-Gradient.gif" alt="Logo" unoptimized width={40} height={25} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-2 font-bold md:text-md md:space-x-6 py-2">
          {["/management", "/contactus", "/updates"].map((path) => (
            <li key={path}>
              <Link href={path}>
                <div
                  className={`hover:text-blue-500 ${
                    router.pathname === path ? "text-blue-600" : "text-white"
                  }`}
                >
                  {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="cart absolute right-0 top-5 mx-6 cursor-pointer flex">
        <Link href="/">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          ) : (
            <Image
              src="/contact-gradient.gif"
              alt="Login"
              unoptimized
              width={40}
              height={25}
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
