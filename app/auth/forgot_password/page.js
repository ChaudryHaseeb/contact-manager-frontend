'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
    const [loading, setLoading] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sent email");
      }
      toast.success("Password reset link sent!!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Error in sending link to email ");
    }finally{
        setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
      />
      <h1 className=" text-red-600 text-3xl font-bold py-2 px-6 mb-4 rounded-sm">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is require" })}
          placeholder="Enter your email"
          className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
        />
          {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
        <button
          type="submit"
          className={`w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
