'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import SkillsDiv from './SkillsBox'
import { Brain } from 'lucide-react'
import { ISkills } from '@/lib/models/skillsSchema'

type Props = {
  skills: ISkills[]
}
const Skils = ({skills}:Props) => {
 
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
       
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
       skills.length === 0 && (
          <div className=' mt-12 p-1'>
          <p className=' text-center text-lg text-gray-700 dark:text-gray-300 font-mono'>No Skills in this section</p>
          <p className=' text-sm text-center text-gray-700 dark:text-gray-300'>Add a Skill for showcase</p>
          </div>
        )
       }
      </div>
    </div>
  )
}

export default Skils