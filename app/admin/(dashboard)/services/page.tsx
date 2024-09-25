'use client'
import { Loader2, PlusCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IServices } from '@/lib/models/serviceSchema';
import ServiceBox from './_components/ServiceBox';
import axios from 'axios';
import ServiceModal from './_components/ServiceModal';

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [services, setServices] = useState<IServices[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/service/get-all");
      setLoading(false);
      setServices(response.data.services);
    } catch (error:any) {
      setLoading(false);
      console.error(error.message);
    }
  }

  useEffect(() => {
   getAllServices();
  },[])
  return (
    <div>
       <div className=' flex flex-row max-sm:flex-col max-sm:gap-4 justify-between items-center'>
     <h1 className=' underline lg:text-5xl md:text-4xl text-3xl font-poppins font-extrabold text-black dark:text-white px-2'>Services &nbsp; Section</h1>

     <button type="button" className=' flex items-center gap-x-3 p-2 bg-black rounded-md text-white dark:bg-white dark:text-black px-4 active:scale-95 duration-200 ease-in-out transition'
      onClick={() => setOpenModal(true)}
     >
      <PlusCircle size={20} /> Add Services
     </button>
     </div>

     <div className=' mt-10 w-full'>
     <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
       {
        services && services.map((service) => (
          <ServiceBox service={service} refetchData={getAllServices} key={service._id} />
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
        !loading && services.length === 0 && (
        <div className=' w-full mt-10'>
            <p className=' text-lg font-bold text-center'>You did not have any services added </p>
            <p className=' text-sm font-medium text-center'>Please add a service</p>
        </div>
         )}
     </div>
     {
      openModal && (
        <ServiceModal setOpen={setOpenModal} refetchData={getAllServices} />
      )
     }
    </div>
  )
}

export default Page