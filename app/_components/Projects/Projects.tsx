'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import { ArrowRight, Shapes } from 'lucide-react'
import { project } from '@/app/data/data'
import ProjectBox from './ProjectBox'
import Link from 'next/link'

type Props = {}

const Projects = (props: Props) => {
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
        <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
      <SectionHeader title='Projects' icon={Shapes} description='This reald world projets help me to beald experience, and help me boost up my confidence' />
      <div className=" 800px:p-5 p-2 mt-5">
       <div className=" max-sm:overflow-hidden  grid md:grid-cols-2  grid-cols-1 lg:gap-14 md:gap-10 sm:gap-6 gap-3">
        {
         project.slice(-4).map((item, index) => (
           <ProjectBox item={item} index={index} />
         ))
        }
       </div>
      </div>
      <div className=' mt-10 space-y-3'>
        <div className=' flex items-baseline gap-x-3  w-full justify-start'>
        <h2 className=' text-sm text-blue-900 dark:text-green-700 whitespace-nowrap'>Want to see all projects? </h2>
        <div className=' w-full h-1 bg-[#8d8d8d56]' />
        </div>
        <Link href={"/project"} className=' transition-all border border-black dark:border-white  p-2 w-[200px] flex items-center justify-center gap-x-3 '>
          See all projects <ArrowRight size={20} />
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Projects