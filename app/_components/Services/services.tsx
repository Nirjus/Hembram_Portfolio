'use client'
import React from 'react'
import SectionHeader from '../Section-heading'
import { HeartHandshake } from 'lucide-react'
import { services } from '@/app/data/data'
import ServiceBox from './ServiceBox'

type Props = {}

const Services = (props: Props) => {
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
    <div className=" w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
  <SectionHeader title='Services' icon={HeartHandshake} description='All the services you provided for our beloved customers, you can check it out.' />
  <div className=" lg:p-5 md:p-3 p-2 mt-[60px] space-y-5">
    {
        services.map((item, index) => (
       <ServiceBox item={item} key={index} index={index} />
        ))
    }
  </div>
  </div>
  </div>
  )
}

export default Services
