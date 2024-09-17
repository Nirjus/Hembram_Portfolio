import React from 'react'
import { user } from '../../data/data'
import PhotoSlider from './PhotoSlider'
import { Download, Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Reveal from '../Animations/RevelAnimations'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className=' w-full sm:h-screen h-auto pt-[100px]' >
      <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto ">
        <div className=" flex max-lg:flex-col-reverse justify-center w-full h-full ">
        <div className=' w-full flex justify-center items-center sm:items-start max-sm:text-center flex-col space-y-6 lg:pr-10 max-lg:pt-10 '>
          <Reveal>
          <h1 className='  lg:text-6xl md:text-5xl text-4xl font-extrabold  text-black dark:text-white font-poppins'>Hello I am <span className=" text-blue-500 dark:text-green-500 inline-block">{user.name}</span></h1>
          </Reveal>
          <Reveal>
          <h2 className=' lg:text-5xl md:text-4xl text-3xl font-extrabold text-black/80 dark:text-white/80'>{user.subHeading}</h2>
          </Reveal>
          <Reveal>
          <p className=' 2xl:pt-12 lg:pt-5 pt-2 lg:text-[16px] font-mono text-gray-700 dark:text-gray-300 '>{user.description}</p>
          </Reveal>
          <div className=' w-full flex justify-between items-center max-sm:flex-col max-sm:space-y-7'>
            <button className=' max-sm:w-full justify-center duration-200 transition-all flex items-center gap-x-4 border-2 border-blue-500 text-blue-500 font-semibold p-2 rounded-lg hover:bg-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white active:scale-95'>
              Download CV 
              <Download size={20} />
            </button>
            <div className=' flex justify-center items-center gap-x-2'>
              <Link href={"https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Facebook /></div>
              </Link>
              <Link href={"https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Instagram /></div>
              </Link>
              <Link href={"https://google.com"}>
             <div className=' w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white'><Linkedin /></div>
              </Link>
            </div>
          </div>
        </div>
       <PhotoSlider images={user.photos}/>
        </div>
      </div>
    </div>
  )
}

export default Hero