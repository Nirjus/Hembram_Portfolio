'use client'
import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import { IUser } from '@/lib/models/userSchema';
import PicPage from './UpdatePictureSection';
import FileAddSection from './FileAddSection';
import SideBar from './SideBar';
type Props = {
    user:IUser
}

const ProfileInfoSection = ({user}: Props) => {
    const [loading, setLoading] = useState(false);
    const [tabIndex, setTabIndex] = useState(0)
    const [users, setUsers] = useState({
      name: user?.name || "",
      description: user?.description || "",
      subHeading:user?.subHeading || ""
    });
  
    const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (!users.name || !users.description || !users.subHeading) {
          toast.error("Fill all filds first");
          return;
        }
        const response = await axios.put("/api/user/update-info", users);
        toast.success(response.data.message);
         setUsers(response.data.user)
      } catch (error: any) {
        console.error("Error in updating user INFO", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
  
  return (
  <div className=' w-full relative'>
      <SideBar setTabIndex={setTabIndex} />
   {
      tabIndex === 0 && (
        <form
        onSubmit={handleUpdateUser}
        className=" w-full md:p-4 p-2 md:mt-7 mt-4 "
      >
        <div className=" mb-5 space-y-3 mx-auto  flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
          <h1 className=" whitespace-nowrap lg:text-6xl md:text-5xl text-4xl font-extrabold  text-black dark:text-white font-poppins">
            Hello I am__
          </h1>
          <input
            type="text"
            value={users?.name}
            onChange={(e) => setUsers({ ...users, name: e.target.value })}
            placeholder="Name here"
            className="border px-2 border-[#71717130] bg-transparent outline-none lg:text-6xl md:text-5xl text-4xl font-extrabold font-poppins text-blue-500 dark:text-green-500 inline-block"
          />
        </div>
        <div className=" mb-5 space-y-3 mx-auto flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
          <textarea
            rows={2}
            value={users?.subHeading}
            onChange={(e) => setUsers({ ...users, subHeading: e.target.value })}
            placeholder="Sub Headng here"
            className="border px-2 border-[#71717130] bg-transparent outline-none llg:text-5xl md:text-4xl text-3xl font-extrabold font-poppins text-black/80 dark:text-white/80 inline-block"
          />
        </div>
        <div className=" mb-5 space-y-3 mx-auto flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
          <textarea
            rows={4}
            value={users?.description}
            onChange={(e) => setUsers({ ...users, description: e.target.value })}
            placeholder="Description here"
            className="border px-2 border-[#71717130] bg-transparent outline-none lg:text-[16px] font-extrabold font-poppins text-black/80 dark:text-white/80 inline-block"
          />
        </div>
        <div className=" mb-5 space-y-3 mx-auto flex flex-col xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] ">
          <button
            type="submit"
            disabled={loading}
            className={`p-2 px-4 rounded-lg border-2 max-400px:border text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white active:bg-blue-700 dark:active:bg-green-700 active:scale-95 duration-200 ease-in-out transition
         ${loading && " animate-pulse bg-blue-300/30 dark:bg-green-300/20"}
         `}
          >
            {loading ? "Loding.." : " Update Info"}
          </button>
        </div>
      </form>
      )
   }
   {
    tabIndex === 1 && (
        <PicPage user={user} />
    )
   }
   {
    tabIndex === 2 && (
        <FileAddSection user={user} />
    )
   }
  </div>
  )
}

export default ProfileInfoSection