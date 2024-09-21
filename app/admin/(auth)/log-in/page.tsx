"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const submitHandler = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("/api/admin/login", user);
      setLoading(false);
      toast.success(response.data.message);
      router.push("/admin");
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
        Welcome Back
      </h1>
      <p className=" md:text-lg text-base text-gray-700 dark:text-gray-300 text-center">
        Login into Admin pannel
      </p>

      <div className=" mt-5">
        <form onSubmit={submitHandler}>
         <div className=" flex flex-col gap-2 ">
          <label htmlFor="email" className=" font-poppins cursor-pointer text-blue-900 dark:text-green-900 font-semibold">Email</label>
          <input type="email" name="email" id="email"
           className=" px-3 outline-none focus:bg-transparent focus:border border-black text-black placeholder:text-gray-600 p-2 bg-gray-300/10"
           placeholder="abc@gmail.com"
           required
           value={user.email}
           onChange={(e) => setUser({...user,email: e.target.value})}
          />
         </div>
         <div className=" relative flex flex-col mt-3 gap-2 ">
          <label htmlFor="password" className=" font-poppins cursor-pointer text-blue-900 dark:text-green-900 font-semibold ">Password</label>
          <input type={visible ? "text": "password"} name="password" id="password"
           className=" px-3 outline-none focus:bg-transparent focus:border border-black text-black placeholder:text-gray-600 p-2 bg-gray-300/10"
           placeholder="abc@gmail.com"
           required
           value={user.password}
           onChange={(e) => setUser({...user,password: e.target.value})}
          />
          <div className=" text-gray-700 absolute bottom-[10px] right-2 cursor-pointer " onClick={() => setVisible(!visible)}>
           { 
            visible ? <EyeOff size={18} /> : <Eye size={18} />
           }
          </div>
          
         </div>
         <p className=" mt-3 text-sm text-gray-700 dark:text-gray-300 text-right">
         <Link href={"/admin/forgot-password"} >
         Forgot password?
          </Link>
          </p>
         <div className=" mt-6">
          <button type="submit" className=" active:scale-95 duration-200 transition-all ease-in-out flex items-center justify-center w-full p-2 bg-gray-800 text-white"
           disabled={!user.email || !user.password || loading}>
           {
            loading ? <Loader2 className=" animate-spin " /> : "Login"
           }
          </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
