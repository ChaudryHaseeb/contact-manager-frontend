'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';


const page = () => {
    const logout = () =>{
        localStorage.removeItem('token');

    };
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push('/login'); 
      };

  return (
    <div>
        <Button className="w-full mt-96" variant="default" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default page

