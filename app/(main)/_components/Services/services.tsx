'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import { HeartHandshake } from 'lucide-react'
import ServiceBox from './ServiceBox'
import { IServices } from '@/lib/models/serviceSchema'

type Props = {
  services: IServices[]
}

const Services = ({services}:Props) => {
 
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
    
  <SectionHeader title='Services' icon={HeartHandshake} description='All the services you provided for our beloved customers, you can check it out.' />
  <div className=" lg:p-5 md:p-3 p-2 mt-[60px] space-y-5">
    {
       services && services.map((item, index) => (
       <ServiceBox item={item} key={index} index={index} />
        ))
    }
  </div>
  {
        services.length === 0 && (
          <div className=' mt-12 p-1'>
          <p className=' text-center text-lg text-gray-700 dark:text-gray-300 font-mono'>No Services in this section</p>
          <p className=' text-sm text-center text-gray-700 dark:text-gray-300'>Add a Services for showcase</p>
          </div>
        )
      }
  </div>
  )
}

export default Services
