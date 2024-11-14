'use client'
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import { ISkills } from '@/lib/models/skillsSchema';
import SkillModal from './SkillModal';
import SkillBox from './skillBox';

type Props = {
    skills: ISkills[]
}

export default function SkillOverview({skills:initialSkills}: Props) {
    const [skills, setSkills] = useState(initialSkills);
    const [openModal, setOpenModal] = useState(false);

    function handleUpdateSkill(skill:ISkills){
        setSkills((skills) => 
            skills.map((item) => item._id === skill?._id ? skill : item)
        )
    }
    function addSkill(skill:ISkills){
        setSkills((prevSkill) => [...prevSkill, skill])
    }
    function deleteSkill(skillId: string){
        setSkills((prevSkills) => prevSkills.filter((item) => item?._id !== skillId))
    }
  return (
    <div>
         <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 justify-between items-center'>
     <h1 className=' underline xl:text-4xl lg:text-3xl md:text-2xl text-xl font-poppins font-extrabold text-black dark:text-white px-2'>Skills &nbsp; Section</h1>

     <button type="button" className=' flex items-center gap-x-3 p-2 bg-black rounded-md text-white dark:bg-white dark:text-black px-4 active:scale-95 duration-200 ease-in-out transition'
      onClick={() => setOpenModal(true)}
     >
      <PlusCircle size={20} /> Add Skill
     </button>
     </div>
     <div className=' mt-10 w-full'>
       <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {
          skills && skills.map((skill, index) => (
            <SkillBox onDelete={() => deleteSkill(skill._id)} onUpdate={handleUpdateSkill} data={skill} key={index} />
          ))
        }
       </div>
       {
        skills.length === 0 && (
        <div className=' w-full mt-10'>
            <p className=' text-lg font-bold text-center'>You did not have any skill added </p>
            <p className=' text-sm font-medium text-center'>Please add a skill</p>
        </div>
         )}
       
      </div>
      {
        openModal && <SkillModal crudCall={addSkill} setOpen={setOpenModal} />
      }
    </div>
  )
}