'use client'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@/components/ui/checkbox";
import { validatePassword } from '../../components/ValidatePassword';

const ResetPassword = () => {
    const { token } = useParams();
    const {register, handleSubmit, watch, formState : { errors }} = useForm();
    const [loading, setLoading] =  useState();
    const [visiblePassword, setVisiblePassword] = useState(false);
    const password = watch('password');
 
    const onSubmit = async (data) =>{
        setLoading(true);

        if (!validatePassword(data.password)) {
            setError('password',
                { type : 'manual',
                    message : "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
                }
            );
            setLoading(false);
            return;
        };

        try {
            const response = await fetch(`http://localhost:8080/api/user/reset-password/${token}`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body :  JSON.stringify({ password : data.password }),
            });

            console.log('response-----------', response)

            if (!response.ok) {
                throw new Error('Failed to reset your password')
            };

            toast.success("Password reset successfull!!", {
                position: "top-right",
                autoClose: 1000,
              });
        } catch (error) {
            toast.error('Error in Reseting the Password')
        }finally{
            setLoading(false);
        };
    }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
               <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
      />
        <h1 className=" text-green-600 font-bold text-3xl py-2 px-6 mb-4 rounded-sm">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-400'>
               New Password
            </label>
            <input 
            id='password'
            type={visiblePassword ? 'text' : 'password'} 
            {...register('password',{required :'Password is require'})}
            placeholder='Enter new password'
            className='w-full p-2 border border-gray-300 rounded text-black'
            />
         {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p> // Render message, not object
        )}

                              {/* Confirm Password */}

            <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-400 mt-4'>
               Confirm New Password
            </label>
            <input 
            id='confirmPassword'
            type={visiblePassword ? 'text' : 'password'} 
            {...register('confirmPassword',{required :'Password is require',
                validate: value => value === password || 'Password do not match'
            })}
            placeholder='Enter new password'
            className='w-full p-2 border border-gray-300 rounded text-black'
            />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p> // Fixed: Render the message, not the object
        )}
            <div className="flex items-center mt-2 ">
                <Checkbox checked={visiblePassword} onCheckedChange={()=>setVisiblePassword(!visiblePassword)} className='text-white bg-black'/>
                    <label htmlFor="password" className='ml-2'>Show Password</label>
            </div>
            <button type='submit' className={`w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} 
          >
            {loading ? 'Reseting...' : 'Password Reset'}
            </button>
        </form>
        </div>
  )
}

export default ResetPassword