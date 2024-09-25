'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Loader2, PlusCircle } from 'lucide-react';
import SkillBox from './_components/skillBox';
import SkillModal from './_components/SkillModal';

const Page = () => {

  const [skills, setSkills] = useState<{name:string,description:string, _id: string}[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/skills/getAll-skills");
      setLoading(false);
      setSkills(response.data.skills);
    } catch (error:any) {
      setLoading(false);
      console.log(error.message);
    }
  } 
  useEffect(() => {
  getAllSkills(); 
  },[])

  return (
    <div>
     <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 justify-between items-center'>
     <h1 className=' underline lg:text-5xl md:text-4xl text-3xl font-poppins font-extrabold text-black dark:text-white px-2'>Skills &nbsp; Section</h1>

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
            <SkillBox refetchData={getAllSkills} data={skill} key={index} />
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
        !loading && skills.length === 0 && (
        <div className=' w-full mt-10'>
            <p className=' text-lg font-bold text-center'>You did not have any skill added </p>
            <p className=' text-sm font-medium text-center'>Please add a skill</p>
        </div>
         )}
       
      </div>
      {
        openModal && <SkillModal refetchAllskill={getAllSkills} setOpen={setOpenModal} />
      }
    </div>
  )
}

export default Page