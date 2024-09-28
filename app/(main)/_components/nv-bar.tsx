"use client";
import { usePathname } from "next/navigation";
import { SquareMenu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeTaggler from "./ThemeTaggler";
import Link from "next/link";

type Props = {
  navItems: { item: string; link: string }[];
};

const NavBar = ({ navItems }: Props) => {
  const pathname = usePathname();
  const [select, setSelect] = useState(0);
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleSelect = (index: number) => {
    setSelect(index);
    setOpenSideBar(false);
  };
  
  useEffect(() => {
    const currentIndex = navItems.findIndex((route) => route.link === pathname);
    if(currentIndex !== -1){
      setSelect(currentIndex);
    }
  },[navItems, pathname])
  return (
    <nav>
      <div className=" mx-auto w-fit flex items-center space-x-6">
        <div
          className={` duration-300 transition-transform ease-in-out flex items-center max-1000px:p-8 max-1000px:w-[70%] max-1000px:h-screen max-1000px:flex-col max-1000px:fixed left-0 top-0 gap-x-2 p-2 rounded-xl backdrop-blur-lg backdrop-filter bg-gray-900/40 dark:bg-gray-500/20 
           ${
             openSideBar
               ? " max-1000px:translate-x-0"
               : " max-1000px:-translate-x-full"
           }
          `}
        >
          <div className=" 1000px:hidden mb-5 flex justify-between items-center border-b-2 border-b-white w-full">
            <h1 className=" text-2xl font-semibold font-poppins text-black dark:text-white">HEMBRAM</h1>
            <X
              className=" cursor-pointer"
              onClick={() => setOpenSideBar(false)}
            />
          </div>
          <div className=" 1000px:hidden mb-10">
            <ThemeTaggler />
          </div>

          {navItems.map((navItem, index) => (
           <Link href={navItem.link} key={index} scroll className=" max-1000px:w-full">
            <div
              className={` z-10 h-10 relative w-24 max-1000px:mb-2 max-1000px:w-full flex items-center justify-center cursor-pointer `}
              onClick={() => handleSelect(index)}
            >
              {index === select ? (
                <motion.div
                  className=" z-0 absolute top-0 left-0 h-10 w-24 max-1000px:w-full rounded-lg bg-white dark:bg-gray-300 shadow-md"
                  layoutId="underline"
                />
              ) : null}
              <p
                className={` text-gray-200 dark:text-gray-300 dark:hover:text-white z-20 hover:text-white`}
                style={{
                  mixBlendMode: "difference",
                }}
              >
                {navItem.item}
              </p>
            </div>
           </Link>
          ))}
          <p className=" 1000px:hidden absolute bottom-5 text-sm text-white">
            @Copyright Ratan_Hembram 2024
          </p>
        </div>

        <div className=" absolute right-5  1000px:hidden  bg-[#83838348] backdrop-blur p-2 rounded-xl cursor-pointer">
          <SquareMenu onClick={() => setOpenSideBar(true)} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
