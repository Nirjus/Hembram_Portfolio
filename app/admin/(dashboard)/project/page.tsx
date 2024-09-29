'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Loader2, PlusCircle } from 'lucide-react'
import { IProject } from '@/lib/models/projectSchema';
import ProjectBox from './_components/ProjectBox';

const Page = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllProject = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/project/getAll-project?_=${new Date().getTime()}`);
      setProjects(response.data.projects);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
   getAllProject();
  },[])
  const projectAddPage = () => {
    router.push(`/admin/project/add`)
  }
  return (
    <div>
       <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 justify-between items-center'>
     <h1 className=' underline xl:text-4xl lg:text-3xl md:text-2xl text-xl font-poppins font-extrabold text-black dark:text-white px-2'>Project &nbsp; Section</h1>

     <button type="button" className=' flex items-center gap-x-3 p-2 bg-black rounded-md text-white dark:bg-white dark:text-black px-4 active:scale-95 duration-200 ease-in-out transition'
     onClick={projectAddPage}
     >
      <PlusCircle size={20} /> Add Projects
     </button>
     </div>

     <div className=' mt-10 w-full'>
       <div className=' grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-4 gap-3'>
         {
          projects && projects.map((project, index) => (
            <ProjectBox project={project} key={index} />
          ))
         }
       </div>
       {
          loading && (
           <div className=' w-full p-5 mt-10 flex justify-center items-center'>
             <Loader2 size={35} className=' animate-spin text-blue-500 dark:text-green-500' />
           </div>
          )
       }
       {
       !loading && projects.length === 0 && (
          <div className=' mt-12 p-1'>
          <p className=' text-center text-lg text-gray-700 dark:text-gray-300 font-mono'>No project in this section</p>
          <p className=' text-sm text-center text-gray-700 dark:text-gray-300'>Add a project for showcase</p>
          </div>
        )
       }
     </div>
    </div>
  )
}

export default Page