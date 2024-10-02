"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        localStorage.setItem("token", JSON.stringify(result.accessToken));
        localStorage.setItem("role", JSON.stringify(result.user.role));
        toast.success("🦄 Login successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push(result.user.role === "admin" ? "/admin" : "/addcontact");
        }, 1000);
      } else {
        const result = await response.json();
        setError(result.message || "Login failed");
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred while trying to log in");
      toast.error("An error occurred while trying to log in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/Login.avif')] bg-cover bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
      />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <Image
            src="/Pencil3-Gradient.gif"
            alt="Pencil Gif"
            width={40}
            height={40}
            className="object-contain pb-6 ml-3"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              autoComplete="username"
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
              type={visiblePassword? 'text' : "password"}
              placeholder="Password"
              className="mt-1 p-2 border rounded w-full"
              autoComplete="current-password"

            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center mt-1">
            <Checkbox checked={visiblePassword} onCheckedChange={()=>setVisiblePassword(!visiblePassword)} />
              <label htmlFor="password" id="password" className="ml-2">Show Password</label>
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <Link href="/signup">
            <div className="hover:underline">Sign Up Here </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
