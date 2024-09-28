'use client'
import React from "react";
import { ArrowRight, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import NavBar from "./_components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reveal from "../(main)/_components/Animations/RevelAnimations";

// type Props = {}

const Page = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.post("/api/admin/logout").then((res) => {
      toast.success(res.data.message);
      router.refresh();
    }).catch((error:any) => {
      toast.error(error.response.data.message);
    })
  }
  return (
    <div className=" min-h-screen h-auto w-full">
      <NavBar />
      <div className=" mx-auto lg:w-[80%] md:w-[70%] w-[90%] lg:p-20 md:p-10 p-5 lg:pt-36 sm:pt-28 pt-24">
        <div className=" w-full">
          <Reveal>
            <h1 className="  text-transparent bg-clip-text  bg-gradient-to-r from-indigo-500 to-emerald-500 xl:text-6xl lg:text-5xl md:text-4xl text-2xl font-poppins font-extrabold text-center  ">
              Welcome to
            </h1>
          </Reveal>
          <Reveal>
            <h1 className=" text-transparent bg-clip-text  bg-gradient-to-r to-indigo-500 from-emerald-500 xl:text-6xl lg:text-5xl md:text-4xl text-2xl font-poppins font-extrabold text-center ">
              Admin Dashbord
            </h1>
          </Reveal>
          <br />
          <div className=" h-1 mb-3 w-full bg-[#8888886f]" />
          <Reveal>
            <h1 className=" xl:text-8xl lg:text-6xl md:text-4xl text-3xl font-poppins font-extrabold text-center text-blue-500 dark:text-green-500 uppercase">
              Hembram <span className=" text-black dark:text-white">.</span>
            </h1>
          </Reveal>
        </div>
        <div className=" w-full border-2 border-slate-300 bg-slate-200/20 dark:border-slate-700 dark:bg-slate-700/30 flex justify-center items-center p-5 mt-10">
          <div className=" logo-bounce w-fit lg:p-5 sm:p-3 p-2 bg-[#83838348]  hover:bg-gradient-to-tl  to-indigo-500 dark:to-teal-400 dark:from-blue-500 from-pink-500 backdrop-blur rounded-xl ">
            <h1 className=" font-poppins xl:text-9xl md:text-8xl text-7xl font-extrabold text-white">
              H<span className=" text-blue-500 dark:text-green-500">.</span>
            </h1>
          </div>
        </div>
        <div className=" mt-7 ">
          <div className=" my-2 flex justify-start items-baseline gap-x-1">
            <p className=" text-sm whitespace-nowrap ">Visit your dashboard</p>
            <div className=" h-1 my-3 w-full bg-[#8888886f]" />
          </div>
          <Link href={"/admin/dashboard"}>
          <button
            type="button"
            className=" mb-4 p-2 flex justify-center px-4 active:scale-95 duration-200 transition ease-in-out items-center gap-x-3 text-blue-500 dark:text-green-500 border-2 border-blue-500 dark:border-green-500 hover:bg-blue-500 hover:text-white hover:dark:text-white hover:dark:bg-green-500 rounded-lg"
          >
            Dashboard <ArrowRight />
          </button>
          </Link>
          <div className=" my-2 flex justify-start items-baseline gap-x-1">
            <p className=" text-sm whitespace-nowrap ">logout?</p>
            <div className=" h-1 my-3 w-full bg-[#8888886f]" />
          </div>
          <button
          onClick={handleLogout}
            type="button"
            className=" p-2 flex justify-center px-4 active:scale-95 duration-200 transition ease-in-out items-center gap-x-3 text-blue-500 dark:text-green-500 border-2 border-blue-500 dark:border-green-500 hover:bg-blue-500 hover:text-white hover:dark:text-white hover:dark:bg-green-500 rounded-lg"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
