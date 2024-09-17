'use client'
import React from 'react'
import Reveal from './Animations/RevelAnimations'
import {  ArrowUpRight, LucideIcon } from 'lucide-react'

type Props = {
    title:string
    description: string
    icon?: LucideIcon
}

const SectionHeader = ({title, description, icon:Icon = ArrowUpRight}: Props) => {
 
  return (
    <div className=' flex items-start p-2 justify-between'>
<div className=' w-full  space-y-3'> 
       <Reveal>
       <h1 className=' font-poppins font-extrabold lg:text-5xl md:text-4xl inline-block text-3xl text-blue-500 dark:text-green-500'>
            {title} <span className=' text-black dark:text-white'>.</span>
        </h1>
       </Reveal> 
       <Reveal>
       <p className=' font-mono lg:text-xl text-sm text-gray-700 dark:text-gray-400'>
            {description}
        </p>
       </Reveal>
    </div>
 <div className=' bg-[#8989894d] p-2'>
   { Icon && <Icon size={25} />}
 </div>
    </div>
  )
}

export default SectionHeader