import React, { useState } from 'react'
import SkillModal from './SkillModal';
import AlertDailog from '../../_components/Alert-dailog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ISkills } from '@/lib/models/skillsSchema';

type Props = {
    data:ISkills,
    onDelete: () => void, 
    onUpdate:(newSkill:any) => void
}

const SkillBox = ({data, onDelete, onUpdate}: Props) => {
 
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDilog] = useState(false);
  const [loading, setLoading] = useState(false);

  const skillDeleteHandler = async () => {
    try {
      setLoading(true);
      const response  = await axios.delete(`/api/skills?skillId=${data?._id}`);
      setLoading(false);
      toast.success(response.data.message);
      setOpenAlertDilog(false);
      onDelete();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
    <div className=' hover:scale-95 duration-200 ease-in-out transition h-fit p-3 bg-[#8e8e8e64] rounded-md w-full'>
        <div className=' mt-1 space-y-3'>
            <h1 className=' text-center lg:text-2xl md:text-xl text-lg font-poppins font-extrabold text-blue-500 dark:text-green-500 '>{data.name}</h1>
            <div className=' lg:h-[150px] h-[110px] overflow-y-scroll no-scroll-bar'>
            <p className=' lg:text-[15px] text-sm text-gray-700 dark:text-gray-400 '>{data.description}</p>
            </div>
            <div className=' mt-2 flex justify-between items-center'>
              <button type="button" className=' duration-200 ease-in-out transition active:scale-95 border hover:text-white text-blue-500 dark:text-green-500 border-blue-500 dark:border-green-500 hover:bg-blue-500 dark:hover:bg-green-500 dark:hover:text-white p-2 px-4 text-sm font-semibold rounded-md'
              onClick={() => setOpen(true)}
              >Edit</button>
              <button type="button" className=' duration-200 ease-in-out transition active:scale-95 border hover:text-blue-500 dark:hover:text-green-500 text-white dark:text-white hover:bg-transparent dark:hover:bg-transparent border-blue-500 dark:border-green-500 bg-blue-500 dark:bg-green-500 p-2 px-4 text-sm font-semibold rounded-md'
              onClick={() => setOpenAlertDilog(true)}
              >Remove</button>
            </div>
        </div>
        </div>
        {
          open && <SkillModal setOpen={setOpen} data={data} crudCall={onUpdate} isUpdate />
        }
        {
          openAlertDialog && <AlertDailog loading={loading} setOpen={setOpenAlertDilog} onClickHandler={skillDeleteHandler} />
        }
        </>
  )
}

export default SkillBox