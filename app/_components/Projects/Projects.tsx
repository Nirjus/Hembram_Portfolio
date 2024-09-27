'use client'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../Section-heading'
import { ArrowRight, Loader2, Shapes } from 'lucide-react'
// import { project } from '@/app/data/data'
import ProjectBox from './ProjectBox'
import Link from 'next/link'
import { IProject } from '@/lib/models/projectSchema'
import axios from 'axios'

// type Props = {}

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([] as IProject[]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/project/getAll-project");
      setProjects(response.data.projects);
    } catch (error: any) {
      console.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
   getUser();
  },[])
  
  if(loading){
    return(
      <div className=' flex w-full justify-center items-center h-screen'>
        <Loader2 size={35} className=' text-blue-500 dark:text-green-500 animate-spin' />
      </div>
    )
  }
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
        <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
      <SectionHeader title='Projects' icon={Shapes} description='This reald world projets help me to beald experience, and help me boost up my confidence' />
      <div className=" 800px:p-5 p-2 mt-5">
       <div className=" max-sm:overflow-hidden  grid md:grid-cols-2  grid-cols-1 lg:gap-14 md:gap-10 sm:gap-6 gap-3">
        {
         projects && projects.slice(-4).map((item, index) => (
           <ProjectBox key={index} item={item} index={index} />
         ))
        }
       </div>
       {
       !loading && projects.length === 0 && (
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
    </div>
  )
}

export default Projects