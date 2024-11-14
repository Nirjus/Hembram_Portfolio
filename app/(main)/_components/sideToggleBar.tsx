'use client'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { homeRoutes } from '../constants/NavBarRoutes';
import Link from 'next/link';


function SideToggleBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Toggle drawer state
    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
  return (
    <div>
          <button
        onClick={toggleDrawer}
        className="fixed h-[40px] flex items-center gap-2 top-[90px] rounded-r-full left-0 bg-blue-500 dark:bg-green-500 text-white p-2 z-20 "
      >
        <p className=" sm:block hidden">
        {isDrawerOpen ? "Close Drawer" : "Open Drawer"}
        </p>
        {
          isDrawerOpen ?
          <ChevronLeft size={24} /> : <ChevronRight size={24} />
        }
      </button>
     <div className={` p-2 fixed top-[130px] z-20 left-0 flex flex-col gap-5 rounded bg-gray-500/50 backdrop-blur backdrop-filter transition-transform duration-300 ease-in-out
      ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
          {
            homeRoutes.map((item, index) => (
              <div key={index} className=" text-center">
                <Link href={item.link} className=" hover:underline">
              {item.item}
              </Link>
              {
                index === homeRoutes.length -1 ? "" : <ArrowDown size={20} className=" mx-auto" />
              } 
              </div>
            ))
          }
     </div>
    </div>
  )
}

export default SideToggleBar