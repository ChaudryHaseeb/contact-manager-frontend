"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "../../auth/ValidatePassword";
import Image from "next/image";

export default function Signup() {

      //---------------------------------------- CONSTANTS DICLARATION ------------------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [visiblePassword, setVisiblePassword]= useState(false);

      //---------------------------------------- ONSUBMIT FUNCTION ------------------------------------------

  const onSubmit = async (data) => {
    setServerError("");
    if (!validatePassword(data.password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
      return;
    }

        //---------------------------------------- API Fetch POST ------------------------------------------

    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(
          "🦄 Sign Up successful! Please check your email to verify your account.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );

        setEmailSent(true);
      } else {
        setServerError(result.message || "An error occurred");
        toast.error(result.message || "An error occurred");
      }
    } catch (error) {
      setServerError("An error occurred");
      toast.error("An error occurred while trying to sign up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/Login.avif')] bg-cover bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-md bg-white mt-10 p-8 rounded-lg shadow-md text-black">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mb-6">Sign Up </h2>
          <Image
            src="/Pencil3-Gradient.gif"
            alt="Pencil Gif"
            width={40}
            height={0}
            className="object-contain pb-6 ml-3"
          />
        </div>

        {/* //---------------------------------------- SIGN UP FORM  ------------------------------------------ */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              id="username"
              type="text"
              placeholder="username"
              className="mt-1 p-2 border rounded w-full"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              id="email"
              type="email"
              placeholder="Email"
              className="mt-1 p-2 border rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input 
              {...register("password", { required: "Password is required" })}
              id="password"
              type={visiblePassword ? 'text' : "password"}
              placeholder="Password"
              className="mt-1 p-2 border rounded w-full"
              autoComplete="new-password"
            />           

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex mt-1 items-center">
             <Checkbox id='password' checked = {visiblePassword} onCheckedChange={()=>setVisiblePassword(!visiblePassword)}  />
             <label htmlFor="password" className="ml-2 ">Show Password</label>

             </div>
          <Button className="w-full" type="submit" variant="default">
            Sign Up
          </Button>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </form>

        {/* //---------------------------------------- CONDITION ------------------------------------------ */}


        {emailSent && <div className="text-green-600 mt-4">Email Sent Successfully!! Verify Your Email...</div>}

        {/* //---------------------------------------- LINK LOGIN PAGE  ------------------------------------------ */}

        <div className="mt-6 text-blue-500 text-center">
          <Link href="/">
            <div className="hover:underline">Login Here </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
