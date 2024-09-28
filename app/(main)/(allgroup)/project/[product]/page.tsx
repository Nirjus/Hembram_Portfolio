'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, CalendarCheck2, ChevronLeft, ChevronRight } from 'lucide-react';
import { IProject } from '@/lib/models/projectSchema';

type Props = {
  params:{
    product: string;
  }
}
const Page = ({params}:Props) => {
 
  const sliderRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<IProject>({} as IProject);

  useEffect(() => {
     if(params.product){
      const stringValue = params.product;
      setProject(JSON.parse(decodeURIComponent(stringValue)))
     }
  },[params])

  const increseActiviry = () => {
    if (sliderRef.current) {
      const width = sliderRef.current?.getBoundingClientRect().width;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + width,
        behavior:"smooth"
      })
    }
  };
  const decsiseActiviry = () => {
    if (sliderRef.current) {
      const width = sliderRef.current?.getBoundingClientRect().width;
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - width,
        behavior:"smooth"
      })
    }
  };
   
  return (
    <div className=' w-full flex justify-center items-center min-h-screen h-auto md:pt-[40px] pt-[30px]'>
      <div className=' grid lg:grid-cols-2 grid-cols-1 md:gap-5 gap-4'>
        <div className=' lg:space-y-5 md:space-y-4 space-y-3'>
          <h1 className=' 2xl:text-5xl xl:text-4xl md:text-3xl text-2xl font-mono font-extrabold'>{project?.title}</h1>
          <p className='2xl:text-2xl xl:text-xl md:text-lg text-base dark:text-gray-300 text-gray-700'>{project?.description}</p>
         <div className=' overflow-hidden relative p-2 bg-blue-500 dark:bg-green-500 w-fit pr-10'>
         <p className=' lg:text-lg text-sm font-poppins text-white'>{project?.category}</p>
         <div className=' absolute top-[2px] -right-6 aspect-square w-10 rotate-45 bg-gray-200 dark:bg-[#1c1c1c]' />
         </div>
         <br />
           <div className='h-1 bg-[#82828248] ' />
           <div className=' flex items-center justify-start mt-2 md:gap-5 gap-3'>
             {
              project?.visitLink ? (
               <Link href={project?.visitLink} target="_blank">
                <div className=' rounded-full lg:p-4 md:p-3 p-2 bg-[#85858546] cursor-pointer hover:-rotate-90 transition-transform duration-200 ease-in-out'>
                <ArrowUpRight size={30}/>
              </div>
               </Link>
              ):(
                <div></div>
              )
             }
              <div  className=' flex items-center gap-3'>
              <div className=' rounded-full lg:p-4 md:p-3 p-2 bg-[#85858546]'>
                <CalendarCheck2 size={30} />
              </div>
             <div>
             <p className=' text-base font-poppins '>Timeline</p>
             <p className=' font-light '>[{project?.timeLine}]</p>
             </div>
              </div>
           </div>
        </div>
        <div className=' space-y-2'>
           <div className=' flex overflow-hidden' ref={sliderRef}>
            {
              project && project?.samplWorks?.map((item, index) => (
                <div key={index} className=' flex-none w-full'>
                  <Image src={item?.url} width={1000} height={1000} alt={`sample-image-${index}`}
                  className=' object-cover aspect-video w-full'
                  />
                  </div>
              ))
            }
           </div>
            <div className=' flex items-center gap-1 justify-end'>
              <button type="button" 
              onClick={decsiseActiviry}
              className=' lg:p-2 p-1 text-white bg-blue-500 dark:bg-green-500'>
                <ChevronLeft />
              </button>
              <button type="button"
              onClick={increseActiviry}
              className=' lg:p-2 p-1 text-white bg-blue-500 dark:bg-green-500'>
                <ChevronRight />
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page