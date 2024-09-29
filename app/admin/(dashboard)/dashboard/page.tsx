'use client'
import axios from 'axios'
import { ArrowUpRight, Facebook, Instagram, Linkedin, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false)
  const getAllData = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/allData");
      setData(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllData()
  },[])
  if(loading){
    return (
      <div className=' w-full h-screen flex justify-center mt-20'>
          <Loader2 size={35} className=' animate-spin text-blue-500 dark:text-green-500' />
      </div>
    )
  }
  console.log(data)
  return (
    <div className=' lg:px-4 md:px-2 px-1'>
       <div className=' mb-5 flex justify-evenly items-center gap-5'>
          <div className=' shadow-xl rounded-lg shadow-blue-200 dark:shadow-green-950 w-full flex items-center justify-center gap-4 lg:h-[200px] md:h-[150px] h-[170px] lg:p-4 p-2 hover:bg-[#88888820]'>
               <div >
               <p className=' font-poppins font-extrabold'> <span className=' 2xl:text-6xl lg:text-5xl md:text-2xl text-xl'>{data?.projectsCount}</span> <span className=' lg:text-2xl md:text-lg'>&nbsp; Projects</span></p>
                <p>Total Projects</p>
               </div>
               <div className=' max-sm:hidden lg:p-2 p-1 rounded-full bg-[#88888820] hover:-rotate-90 duration-200 transition-all ease-in-out'>
                  <ArrowUpRight size={25} />
                 </div>
          </div>
          <div className=' shadow-xl rounded-lg shadow-blue-200 dark:shadow-green-950 w-full flex items-center justify-center gap-4 lg:h-[200px] md:h-[150px] h-[170px] lg:p-4 p-2 hover:bg-[#88888820]'>
               <div >
               <p className=' font-poppins font-extrabold'> <span className=' 2xl:text-6xl lg:text-5xl md:text-2xl text-xl'>{data?.skillsCount}</span> <span className=' lg:text-2xl md:text-lg'>&nbsp; Skills</span></p>
                <p>My skill sets</p>
               </div>
               <div className=' max-sm:hidden lg:p-2 p-1 rounded-full bg-[#88888820] hover:-rotate-90 duration-200 transition-all ease-in-out'>
                  <ArrowUpRight size={25} />
                 </div>
          </div>
          <div className=' shadow-xl rounded-lg shadow-blue-200 dark:shadow-green-950 w-full flex items-center justify-center gap-4 lg:h-[200px] md:h-[150px] h-[170px] lg:p-4 p-2 hover:bg-[#88888820]'>
               <div >
               <p className=' font-poppins font-extrabold'> <span className=' 2xl:text-6xl lg:text-5xl md:text-2xl text-xl'>3</span> <span className=' lg:text-2xl md:text-lg'>&nbsp; total</span></p>
                <p>Social Links</p>
               </div>
                 <div className=' max-sm:hidden lg:p-2 p-1 rounded-full bg-[#88888820] hover:-rotate-90 duration-200 transition-all ease-in-out'>
                  <ArrowUpRight size={25} />
                 </div>
          </div>
       </div>

       <div className=' 2xl:mt-12 lg:mt-7 mt-5 lg:gap-6 md:gap-4 gap-4 grid 800px:grid-cols-2 grid-cols-1'>
     
      <div className=' relative overflow-hidden bg-indigo-400 dark:bg-emerald-400 w-full min-h-[200px] p-3 flex justify-evenly items-center'>
        <div className=' aspect-square w-28 absolute -top-14 -right-14 border-b-2 border-white rotate-45 bg-slate-500'>
        </div>
      <Image alt='profile-image' height={200} width={200} src={data?.photos[0]?.url} className=' object-cover aspect-square rounded-full' />
      <div>
        <h1 className=' 2xl:text-4xl xl:text-3xl md:text-2xl text-xl font-mono font-extrabold text-white '>{data?.name}</h1>
        <p className=' 2xl:text-xl md:text-lg text-base text-white'>{data?.subHeading}</p>
      </div>
      <div className=' aspect-square w-28 absolute -bottom-14 -left-14 border-t-2 border-white rotate-45 bg-slate-500'>
      </div>
      </div>
         <div className=' flex flex-col md:gap-5 gap-3'>
          <Link href={"/admin/profile/add-files"}>
          <p className=' hover:underline px-2'>Activate links -</p>
          </Link>
              <Link target="_blank" href={data?.faceBookLink || "https://google.com"}>
             <div className='p-2 duration-200 bg-blue-500 transition-all active:scale-95 flex justify-between items-center rounded-sm '>
          <div className=' flex items-center gap-x-2'>
          <div className=' bg-white p-2 rounded-full'>
           <Facebook className=' text-black' />
           </div>
           <p className=' text-white text-sm'>{data?.faceBookLink ? data?.faceBookLink.substring(0, 20) : "https://google.com"}...</p>
          </div>
           <div className=' bg-white p-2 rounded-full'>
             <ArrowUpRight className=' text-black hover:-rotate-90 duration-200 ease-in-out transition-all' />
           </div>
             </div>
              </Link>
              <Link target="_blank" href={data?.faceBookLink || "https://google.com"}>
             <div className='p-2 duration-200 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 transition-all active:scale-95 flex justify-between items-center rounded-sm '>
          <div className=' flex items-center gap-x-2'>
          <div className=' bg-white p-2 rounded-full'>
           <Instagram className=' text-black' />
           </div>
           <p className=' text-white text-sm'>{data?.instaLink ? data?.instaLink.substring(0, 20) : "https://google.com"}...</p>
          </div>
           <div className=' bg-white p-2 rounded-full'>
             <ArrowUpRight className=' text-black hover:-rotate-90 duration-200 ease-in-out transition-all' />
           </div>
             </div>
              </Link>
              <Link target="_blank" href={data?.linkdeenLink || "https://google.com"}>
             <div className='p-2 duration-200 bg-gradient-to-r from-[#0a66c2] to-[#f8c77e] transition-all active:scale-95 flex justify-between items-center rounded-sm '>
          <div className=' flex items-center gap-x-2'>
          <div className=' bg-white p-2 rounded-full'>
           <Linkedin className=' text-black' />
           </div>
           <p className=' text-white text-sm'>{data?.linkdeenLink ? data?.linkdeenLink.substring(0, 20) : "https://google.com"}...</p>
          </div>
           <div className=' bg-white p-2 rounded-full'>
             <ArrowUpRight className=' text-black hover:-rotate-90 duration-200 ease-in-out transition-all' />
           </div>
             </div>
              </Link>
            </div>
       </div>
    </div>
  )
}

export default Dashboard