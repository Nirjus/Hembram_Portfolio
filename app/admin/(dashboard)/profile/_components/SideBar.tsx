'use client'
import React from 'react'
import { profilePages } from '../../constants/profileRoutes'

interface IsideBar{
    setTabIndex:(tabIndex:number) => void
}
const SideBar = ({setTabIndex}:IsideBar) => {
  return (
    <div className=" max-xl:mt-5 flex flex-col items-center justify-start gap-3 max-xl:flex-row xl:absolute top-0  right-10 h-full border-dashed p-4 border-2 border-[#7f7f7f8a]">
    {profilePages.map((item, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setTabIndex(index)}
        className=" active:scale-95 flex items-center justify-center duration-200 ease-in-out border-b border-[#8b8b8b2b] transition-all h-10 max-xl:w-fit px-2 w-[150px] hover:bg-[#8b8b8b2b]"
      >
        <span className=" xl:hidden">{<item.icon size={20} />}</span>
        <span className=" max-xl:hidden">{item.routeName}</span>
      </button>
    ))}
  </div>
  )
}

export default SideBar