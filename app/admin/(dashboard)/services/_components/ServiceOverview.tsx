"use client";
import { IServices } from "@/lib/models/serviceSchema";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import ServiceBox from "./ServiceBox";
import ServiceModal from "./ServiceModal";

type Props = {
  services: IServices[];
};

export default function ServiceOverview({ services: initialServices }: Props) {
  const [services, setServices] = useState(initialServices);
  const [openModal, setOpenModal] = useState(false);
  function addService(service: IServices) {
    setServices((prevService) => [...prevService, service]);
  }
  function updateService(item: IServices) {
    setServices((service) =>
      service.map((i) => (i._id === item?._id ? item : i))
    );
  }
  function deleteService(serviceId: string) {
    setServices((prevService) =>
      prevService.filter((item) => item?._id !== serviceId)
    );
  }
  return (
    <div>
      <div className=" flex flex-row max-sm:flex-col max-sm:gap-4 justify-between items-center">
        <h1 className=" underline xl:text-4xl lg:text-3xl md:text-2xl text-xl font-poppins font-extrabold text-black dark:text-white px-2">
          Services &nbsp; Section
        </h1>

        <button
          type="button"
          className=" flex items-center gap-x-3 p-2 bg-black rounded-md text-white dark:bg-white dark:text-black px-4 active:scale-95 duration-200 ease-in-out transition"
          onClick={() => setOpenModal(true)}
        >
          <PlusCircle size={20} /> Add Services
        </button>
      </div>

      <div className=" mt-10 w-full">
        <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {services &&
            services.map((service) => (
              <ServiceBox
                service={service}
                onUpdate={updateService}
                onDelete={() => deleteService(service?._id)}
                key={service._id}
              />
            ))}
        </div>
        {services.length === 0 && (
          <div className=" w-full mt-10">
            <p className=" text-lg font-bold text-center">
              You did not have any services added{" "}
            </p>
            <p className=" text-sm font-medium text-center">
              Please add a service
            </p>
          </div>
        )}
      </div>
      {openModal && (
        <ServiceModal setOpen={setOpenModal} crudCall={addService} />
      )}
    </div>
  );
}
