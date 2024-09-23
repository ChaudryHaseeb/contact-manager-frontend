'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import Navbar from './Navbar';


const Notbar = () => {
  const router = useRouter();
const isHomeRoute = router.pathname === '/';
  return (
    <div>
     {!isHomeRoute && <Navbar/>}

    </div>
  )
}

export default Notbar
