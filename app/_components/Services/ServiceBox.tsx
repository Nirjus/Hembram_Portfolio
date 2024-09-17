"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import ServiceDivAnimation from "../Animations/ServiceAnimation";

type ServiceProp = {
  item: {
    name: string;
    description: string;
  };
  index: number;
};
const ServiceBox = ({ item, index }: ServiceProp) => {
  const [open, setOpen] = useState(false);
  return (
    <ServiceDivAnimation width="100%" delay={index}>
        <div className=" w-full lg:p-5 p-2 rounded hover:border-2 border-blue-500 dark:border-green-500 backdrop-blur bg-[#86868640] hover:bg-[#89898950]">
      <div className=" flex justify-between items-center">
        <h1 className=" lg:text-2xl md:text-xl text-lg font-extrabold font-poppins text-gray-500/80 dark:text-gray-300">
         <span className=" text-blue-500 dark:text-green-500 mr-3">{String(index+1).padStart(2,'0')}</span> {item.name}
        </h1>
        <div
          className=" sm:p-2 p-1 bg-[#85858544] cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronDown /> : <ChevronUp />}
        </div>
      </div>
      {open ? (
        <div className=" mt-5 w-full bg-[#ffffff26] lg:p-2 p-1 border border-transparent ">
          <p className="  md:text-lg text-sm  font-poppins text-justify text-gray-500 dark:text-gray-300">
            {item.description}
          </p>
        </div>
      ) : (
        <p className=" ml-3" onClick={() => setOpen(true)}>
          see..
        </p>
      )}
    </div>
    </ServiceDivAnimation>
  );
};

export default ServiceBox;
