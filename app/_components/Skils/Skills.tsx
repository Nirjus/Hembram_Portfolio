'use client'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../Section-heading'
// import { skills } from '../../data/data'
import SkillsDiv from './SkillsBox'
import { Brain, Loader2 } from 'lucide-react'
import { ISkills } from '@/lib/models/skillsSchema'
import axios from 'axios'

// type Props = {}

const Skils = () => {
  const [skills, setSkills] = useState<ISkills[]>([] as ISkills[]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/skills/getAll-skills");
      setSkills(response.data.skills);
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
      <SectionHeader title='Skills' icon={Brain} description='All skills which I accrued through my full carriers, and gain knowledge' />

      <div className=" h-full -z-10 800px:p-5 p-2 mt-5">
       <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 md:gap-x-4 gap-2">
        {
        skills && skills.map((skill, index) => (
          <SkillsDiv skill={skill} key={index} index={index} />
        ))
        }
       </div>
       {
       !loading && skills.length === 0 && (
          <div className=' mt-12 p-1'>
          <p className=' text-center text-lg text-gray-700 dark:text-gray-300 font-mono'>No Skills in this section</p>
          <p className=' text-sm text-center text-gray-700 dark:text-gray-300'>Add a Skill for showcase</p>
          </div>
        )
       }
      </div>
        </div>
    </div>
  )
}

export default Skils