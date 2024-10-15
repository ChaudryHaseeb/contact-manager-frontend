'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const VerifyToken = () => {

      //---------------------------------------- CONSTANTS DICLARATION ------------------------------------------

  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

      //---------------------------------------- USE EFFECT ------------------------------------------

  useEffect(() => {

        //---------------------------------------- VERIFY EMAIL FUNCTION ------------------------------------------

    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const email = urlParams.get('email');

          //---------------------------------------- API Fetch GET ------------------------------------------

      if (token && email) {
        try {
          const response = await fetch(`http://localhost:8080/api/user/verify-token?token=${token}&email=${email}`, {
            method: 'GET',
          });

          const result = await response.json();

          if (response.ok) {
            setMessage(result.message || 'Email verified successfully!');
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          } else {
            setMessage(result.message || 'Verification failed. Please try again.');
          }
        } catch (error) {
          setMessage('An error occurred while verifying your email.');
        }
      } else {
        setMessage('Invalid verification link.');
      }

      setLoading(false);
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-600">
      {loading ? (
        <p>Verifying your email...</p>
      ) : (
        <h2>{message}</h2>
      )}
    </div>
  );
};

export default VerifyToken;
