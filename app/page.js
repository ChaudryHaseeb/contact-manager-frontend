import Login from "./auth/login/page";
import React from "react";
import Head from "next/head";


const page = () => {
  <Head>
<link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any" />
</Head>


  return (
    <>
    <div>
      <Login/>
    </div>
    </>
  );
};

export default page;


