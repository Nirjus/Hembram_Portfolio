import axios from "axios";
import { Loader, X } from "lucide-react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IServices } from '@/lib/models/serviceSchema'

type Props = {
  service?:IServices,
  setOpen: (open:boolean) => void;
  isUpdate?: boolean;
  refetchData: () => void;
}

const ServiceModal = ({service, setOpen, isUpdate=false, refetchData}: Props) => {
  const [services, setServices] = useState({
    name: service?.name || "",
    description: service?.description || ""
  })
  const [loading, setLoading] = useState(false);
  const handleUpdateService = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(`/api/service/update-service/${service?._id}`,services);
      setLoading(false);
      toast.success(response.data.message);
      refetchData();
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  }
  const handleAddService = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`/api/service/add-service`,services);
      setLoading(false);
      toast.success(response.data.message);
      refetchData();
      setOpen(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  }
  return (
    <div className=" w-full h-screen fixed z-[60] inset-x-0 inset-y-0 bg-slate-950/20 flex justify-center items-center">
      <div className=" h-auto lg:w-[400px] md:w-[300px] w-[90%] p-6 rounded-xl shadow-md bg-slate-100">
        <div className=" w-full flex justify-end mb-3">
          <button type="button" onClick={() => setOpen(false)}>
            {" "}
            <X color="black" />
          </button>
        </div>
        <div>
          <p className=" text-lg dark:text-green-500 text-blue-500 font-poppins mb-2">
            {isUpdate? "Update" : "Add"} your Services here
          </p>
          <form action="" className=" w-full" onSubmit={isUpdate? handleUpdateService : handleAddService}>
            <label
              htmlFor="name"
              className="text-sm dark:text-green-500 text-blue-500 font-poppins "
            >
              Service name
            </label>
            <input
              type="text"
              placeholder="Service title"
              id="name"
              name="name"
              value={services.name}
              onChange={(e) => setServices({...services, name: e.target.value})}
              className=" outline-none p-3 bg-slate-400/50 rounded-md text-black placeholder:text-gray-500 w-full"
            />
            <div className=" h-5" />
            <label
              htmlFor="description"
              className="text-sm dark:text-green-500 text-blue-500 font-poppins "
            >
              Skill Description
            </label>
            <textarea
              placeholder="Skill description"
              rows={5}
              id="description"
              name="description"
              value={services.description}
              onChange={(e) => setServices({...services, description: e.target.value})}
              className=" outline-none p-3 bg-slate-400/50 rounded-md text-black placeholder:text-gray-500 w-full"
            />

            <button type="submit" disabled={!services.name || !services.description || loading}
             className=" w-full mt-3 rounded-md p-2 bg-blue-500 dark:bg-green-500 text-white active:scale-95 duration-200 ease-in-out transition"
            >
               {loading ? <Loader size={24} className=" mx-auto animate-spin" /> : isUpdate ? "Upgrade service" : "Add Service"} 
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal