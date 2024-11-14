import React from 'react'
import PhotoSlider from './PhotoSlider'
import { Download, Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Reveal from '../Animations/RevelAnimations'
import { IUser } from '@/lib/models/userSchema'

type Props = {
  user:IUser
}
const Hero = ({user}:Props) => {

  return (
    <div className=' w-full sm:h-screen h-auto sm:pt-[40px] pt-[50px]' >
        <div className=" flex max-lg:flex-col-reverse justify-center w-full h-full ">
        <div className=' w-full flex justify-center items-center sm:items-start max-sm:text-center flex-col space-y-6 lg:pr-10 max-lg:pt-10 '>
          <Reveal>
          <h1 className='  lg:text-6xl md:text-5xl text-4xl font-extrabold  text-black dark:text-white font-poppins'>Hello I am <span className=" text-blue-500 dark:text-green-500 inline-block">{user?.name}</span></h1>
          </Reveal>
          <Reveal>
          <h2 className=' lg:text-5xl md:text-4xl text-3xl font-extrabold text-black/80 dark:text-white/80'>{user?.subHeading}</h2>
          </Reveal>
          <Reveal>
          <p className=' 2xl:pt-6 lg:pt-4 pt-2 lg:text-[16px] font-mono text-gray-700 dark:text-gray-300 '>{user?.description}</p>
          </Reveal>
          <div className=' w-full flex justify-between items-center max-sm:flex-col max-sm:space-y-7'>
           <Link download="HembramCV.pdf" href={user?.cvFile?.url || "https://google.com"} target="_blank">
           <button className=' max-sm:w-full justify-center duration-200 transition-all flex items-center gap-x-4 border-2 border-blue-500 text-blue-500 font-semibold p-2 rounded-lg hover:bg-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white active:scale-95'>
              Download CV 
              <Download size={20} />
            </button>
           </Link>
            <div className=' flex justify-center items-center gap-x-2'>
              <Link target="_blank" href={user?.faceBookLink || "https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Facebook /></div>
              </Link>
              <Link target="_blank" href={user?.instaLink || "https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Instagram /></div>
              </Link>
              <Link target="_blank" href={user?.linkdeenLink || "https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Linkedin /></div>
              </Link>
            </div>
          </div>
        </div>
       <PhotoSlider images={user?.photos}/>
        </div>
    </div>
  )
}

export default Hero