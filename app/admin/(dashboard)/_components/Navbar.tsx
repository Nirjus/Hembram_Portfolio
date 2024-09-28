import { ThemeSwitch } from "@/app/(main)/_components/ThemeTaggler";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

// type Props = {};

const Navbar = () => {
  return (
    <nav className=" w-full fixed inset-y-0 h-[80px] z-50 bg-[#8383833f] dark:bg-[#7171714f] border-b-2 border-blue-500 dark:border-green-500 backdrop-blur backdrop-filter">
      <div className=" w-full h-full flex justify-between items-center sm:px-10 px-5">
       <Link href={"/"}>
       <div className=" px-2 bg-[#83838348] backdrop-blur rounded-md p-1">
          <h1 className=" font-poppins font-extrabold text-2xl text-white">
            H<span className=" text-blue-500 dark:text-green-500">.</span>
          </h1>
        </div>
       </Link>
        <div className=" flex items-center gap-x-2">
          <Link href={"/admin"}>
            <div className=" p-1 bg-slate-500/20 rounded-full">
              <ArrowLeft />
            </div>
          </Link>
          <div className=" p-1 bg-slate-500/20 rounded-full">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
