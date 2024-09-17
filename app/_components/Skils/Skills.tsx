'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import { skills } from '../../data/data'
import SkillsDiv from './SkillsBox'
import { Brain } from 'lucide-react'

// type Props = {}

const Skils = () => {
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
        <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
      <SectionHeader title='Skills' icon={Brain} description='All skills which I accrued through my full carriers, and gain knowledge' />

      <div className=" h-full -z-10 800px:p-5 p-2 mt-5">
       <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 md:gap-x-4 gap-2">
        {
        skills.map((skill, index) => (
          <SkillsDiv skill={skill} key={index} index={index} />
        ))
        }
       </div>
      </div>
        </div>
    </div>
  )
}

export default Skils