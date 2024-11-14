'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import { ArrowRight, Shapes } from 'lucide-react'
import ProjectBox from './ProjectBox'
import Link from 'next/link'
import { IProject } from '@/lib/models/projectSchema'

type Props = {
  projects: IProject[]
}

const Projects = ({projects}:Props) => {
 
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
      <SectionHeader title='Projects' icon={Shapes} description='This reald world projets help me to beald experience, and help me boost up my confidence' />
      <div className=" 800px:p-5 p-2 mt-5">
       <div className=" max-sm:overflow-hidden  grid xl:grid-cols-3 md:grid-cols-2  grid-cols-1 lg:gap-14 md:gap-10 sm:gap-6 gap-3">
        {
         projects && projects.slice(-6).map((item, index) => (
           <ProjectBox key={index} item={item} index={index} />
         ))
        }
       </div>
       {
        projects.length === 0 && (
          <div className=' mt-12 p-1'>
          <p className=' text-center text-lg text-gray-700 dark:text-gray-300 font-mono'>No project in this section</p>
          <p className=' text-sm text-center text-gray-700 dark:text-gray-300'>Add a project for showcase</p>
          </div>
        )
       }
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
  )
}

export default Projects