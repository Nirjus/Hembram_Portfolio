import { ThemeSwitch } from '@/app/_components/ThemeTaggler'
import React from 'react'

// type Props = {}

const NavBar = () => {
  return (
    <div className=' w-full fixed h-[80px] bg-[#83838362] dark:bg-[#7171714f] border-b-2 border-blue-500 dark:border-green-500 backdrop-blur-sm backdrop-filter'>
        <div className=" w-full h-full flex justify-end items-center sm:px-10 px-5">
       <div className=' p-1 bg-slate-500/20 rounded-full'>
       <ThemeSwitch />
       </div>
         </div>
    </div>
  )
}

export default NavBar