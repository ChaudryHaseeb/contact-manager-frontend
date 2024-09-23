"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "../components/ValidatePassword";
import Image from "next/image";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!validatePassword(data.password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
      return;
    }

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
        // window.confirm("Sign Up successful!");
        toast.success('🦄 Login successful!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
        router.push("/login");
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
        autoClose={1000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-md bg-white mt-10 p-8 rounded-lg shadow-md">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mb-6">Sign Up </h2>
          <Image
            src="/Pencil3-Gradient.gif"
            alt="Pencil Gif"
            unoptimized
            width={40}
            height={0}
            className="object-contain pb-6 ml-3"
          />
        </div>
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
              type="password"
              placeholder="Password"
              className="mt-1 p-2 border rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button className="w-full" type="submit" variant="default">
            Sign Up
          </Button>
          {serverError && <p className="text-red-500">{serverError}</p>}
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/login">
            <div className="hover:underline">Login Here </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
