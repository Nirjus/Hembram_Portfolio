'use client'
import React, { useEffect, useState } from 'react'
import SectionHeader from '../Section-heading'
import { HeartHandshake, Loader2 } from 'lucide-react'
// import { services } from '@/app/data/data'
import ServiceBox from './ServiceBox'
import axios from 'axios'
import { IServices } from '@/lib/models/serviceSchema'

// type Props = {}

const Services = () => {
  const [services, setServices] = useState<IServices[]>([] as IServices[]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/service/get-all`);

      setServices(response.data.services);
    } catch (error: any) {
      console.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
   getUser();
  },[])
  
  if(loading){
    return(
      <div className=' flex w-full justify-center items-center h-screen'>
        <Loader2 size={35} className=' text-blue-500 dark:text-green-500 animate-spin' />
      </div>
    )
  }
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
       !loading && services.length === 0 && (
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
