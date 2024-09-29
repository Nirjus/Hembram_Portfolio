'use client'
import { IProject } from '@/lib/models/projectSchema';
import axios from 'axios';
import { Loader2, Shapes } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import SectionHeader from '../../_components/Section-heading';
import ProjectBox from '../../_components/Projects/ProjectBox';

const Page = () => {
  const [projects, setProjects] = useState<IProject[]>([] as IProject[]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("All");
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/project/getAll-project`);
      setProjects(response.data.projects);
      const allCategorySet  = new Set<string>(["All"]);
      response.data.projects.forEach((item:any) => {
        allCategorySet.add(item?.category?.toLowerCase())
      })
      setCategories(Array.from(allCategorySet));
    } catch (error: any) {
      console.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
   getUser();
  },[])
  const filteredProjects = useMemo(() => {
    return selectedItem === "All"
      ? projects
      : projects.filter((item) => item.category.toLowerCase() === selectedItem);
  }, [projects, selectedItem]);
  
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
     <SectionHeader title='Projects' icon={Shapes} description='category wise project list below' />
     <div className=' my-2 w-full flex flex-wrap justify-center items-center gap-3'>
       {
        categories && categories.map((item, index) => (
          <div key={index} className=' cursor-pointer px-3 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500'
          onClick={() => setSelectedItem(item)}
          >
            <p className=' sm:text-base text-xs text-white capitalize'>{item}</p>
          </div>
        ))
       }
     </div>
      <div className='800px:p-5 p-2'>
      <div className='  max-sm:overflow-hidden  grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-10 sm:gap-6 gap-3'>
      {
        filteredProjects && filteredProjects.map((item, index) => (
          <ProjectBox item={item} index={index} key={index} />
        ))
      }
      
      </div>
        {
          !loading && projects.length === 0 && (
            <div className=' mt-20'>
              <p className=' text-center lg:text-2xl md:text-xl text-lg font-extrabold '>No projects have!</p>
            </div>
          )
        }
        {
          loading && (
            <div className=' w-full mt-20 p-3 flex justify-center items-center'>
              <Loader2 size={35} className=' animate-spin text-blue-500 dark:text-green-500' />
              </div>
          )
        }
      </div>
      </div>
  )
}

export default Page