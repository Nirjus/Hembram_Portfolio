"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";


const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/admin/forgot-password", {email});
      setLoading(false);
      toast.success(response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.log("Sign up failed");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" ">
      <h1 className=" md:text-2xl text-xl font-poppins font-extrabold text-black dark:text-white text-center">
       Forgot Password
      </h1>
      <p className=" md:text-lg text-base text-gray-700 dark:text-gray-300 text-center">
        put your email
      </p>
      <p className=" md:text-lg text-base text-gray-700 dark:text-gray-300 text-center">
       We will send you a link
      </p>
      <div className=" mt-5">
        <form onSubmit={submitHandler}>
         <div className=" flex flex-col gap-2 ">
          <label htmlFor="email" className=" font-poppins cursor-pointer text-blue-900 dark:text-green-900 font-semibold">Email</label>
          <input type="email" name="email" id="email"
           className=" px-3 outline-none focus:bg-transparent focus:border border-black text-black placeholder:text-gray-600 p-2 bg-gray-300/10"
           placeholder="abc@gmail.com"
           required
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
         </div>
         <div className=" mt-8">
          <button type="submit" className=" active:scale-95 duration-200 transition-all ease-in-out flex items-center justify-center w-full p-2 bg-gray-800 text-white"
           disabled={!email || loading}>
           {
            loading ? <Loader2 className=" animate-spin " /> : "Send link"
           }
          </button>
         </div>
        </form>
      </div>
    <div className=" mt-4 border p-2">
   <p className=" flex items-center justify-center gap-x-3 text-sm text-gray-700 dark:text-gray-300">
   <ArrowLeft size={16} />
   <Link href={"/admin/log-in"} >
    Back to login?
   </Link>
    </p>
    </div>
    </div>
  )
}

export default ForgotPassword