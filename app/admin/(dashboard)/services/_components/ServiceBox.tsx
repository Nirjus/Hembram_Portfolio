import { IServices } from "@/lib/models/serviceSchema";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ServiceModal from "./ServiceModal";
import AlertDailog from "../../_components/Alert-dailog";

type Props = {
  service: IServices;
  onUpdate: (newService:any) => void;
  onDelete: () => void
};

const ServiceBox = ({ service, onUpdate, onDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const [openAlertDialog, setOpenAlertDilog] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceDeleteHandler = async () => {
    try {
      setLoading(true);
      const response  = await axios.delete(`/api/service?serviceId=${service?._id}`);
      toast.success(response.data.message);
      onDelete()
      setOpenAlertDilog(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
      <div className=" w-full sm:p-5 p-3 bg-slate-500/40 rounded-lg h-fit">
      <div className=" bg-blue-500 dark:bg-green-500 p-1 px-2">
        <h1 className=" text-center md:text-2xl text-xl font-poppins font-extrabold text-white ">
          {service.name}
        </h1>
      </div>
      <div className=" lg:h-[150px] h-[110px] pt-2 overflow-y-scroll no-scroll-bar">
        <p className=" lg:text-[15px] text-sm text-gray-700 dark:text-gray-400 ">
          {service.description}
        </p>
      </div>
      <div className=" mt-3 flex items-center justify-between">
        <button
          type="button"
          className=" p-2 px-4 bg-gray-500/30 hover:bg-gray-500/70 text-white active:scale-95 duration-200 ease-in-out transition"
          onClick={() => setOpen(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className=" p-2 px-4 border-gray-500/50 border hover:border-gray-400/50 text-white active:scale-95 duration-200 ease-in-out transition"
          onClick={() => setOpenAlertDilog(true)}
        >
          Remove
        </button>
      </div>
    </div>
    {
          open && <ServiceModal isUpdate service={service} crudCall={onUpdate} setOpen={setOpen} />
        }
        {
          openAlertDialog && <AlertDailog loading={loading} setOpen={setOpenAlertDilog} onClickHandler={serviceDeleteHandler} />
        }
    </>
  );
};

export default ServiceBox;
