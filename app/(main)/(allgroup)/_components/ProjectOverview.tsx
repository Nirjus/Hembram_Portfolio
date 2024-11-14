'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { IProject } from '@/lib/models/projectSchema';
import ProjectBox from '../../_components/Projects/ProjectBox';
import SectionHeader from '../../_components/Section-heading';
import { Shapes } from 'lucide-react';

type Props = {
   projects:IProject[],
}

export default function ProjectOverview({projects}: Props) {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState("All");
    const filteredProjects = useMemo(() => {
        return selectedItem === "All"
          ? projects
          : projects.filter((item) => item.category.toLowerCase() === selectedItem);
      }, [projects, selectedItem]);
      
      useEffect(() => {
        const allCategorySet  = new Set<string>(["All"]);
        projects.forEach((item:any) => {
        allCategorySet.add(item?.category?.toLowerCase())
      })
      setCategories(Array.from(allCategorySet))
      },[projects])
  return (
   <div>
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
           projects.length === 0 && (
            <div className=' mt-20'>
              <p className=' text-center lg:text-2xl md:text-xl text-lg font-extrabold '>No projects have!</p>
            </div>
          )
        }
       
      </div>
      </div>
  )
}