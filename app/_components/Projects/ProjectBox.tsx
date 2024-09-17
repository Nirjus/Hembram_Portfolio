"use client";
import { ArrowRightCircle, CalendarArrowDown } from "lucide-react";
import React from "react";
import ProjectBoxAnimation from "../Animations/ProjectBoxAnimation";

type Props = {
  item: {
    category: string,
        title: string,
        dsecription: string,
        timeLine: string,
        sampleWorks:string[]
  };
  index: number;
};

const ProjectBox = ({ item, index }: Props) => {
  return (
   <ProjectBoxAnimation delay={index}>
     <div className=" w-full rounded-xl min-h-[400px] h-auto max-sm:min-h-[300px] bg-gradient-to-tr from-[#8685854a] to-[#6b6b6b5d] dark:from-[#8d8d8d29] shadow-lg dark:to-[#000000b0] backdrop-blur md:p-4 p-2">
      <img
        src={item.sampleWorks[0]}
        className=" object-cover object-center aspect-video w-full rounded-xl"
      />
      <div className=" mt-2">
        <h2 className=" md:text-2xl sm:text-xl text-lg font-poppins text-zinc-700 font-medium dark:text-zinc-300">
          {item.title}
        </h2>
        <p>Created by Hembram</p>
        <div className=" h-fit mt-4 flex justify-between items-start">
          <button className=" transition-all duration-300 ease-in-out text-lg p-2 rounded-md bg-blue-500 text-white border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 flex items-center gap-x-3 justify-center dark:bg-green-500 dark:text-white dark:border-green-500 dark:hover:bg-transparent dark:hover:text-green-500 px-6  ">
            Details <ArrowRightCircle size={20} />
          </button>
          <div className=" flex items-center gap-4 rounded-lg p-1 bg-white dark:bg-[#1c1c1c]">
            <CalendarArrowDown  />
            <div className=" text-sm">
            {
                item.timeLine.split("-").map((i: string, index) => (
                    <p key={index} className=" font-light">{i}</p>
                ))
            }
            </div>
          </div>
        </div>
      </div>
    </div>
   </ProjectBoxAnimation>
  );
};

export default ProjectBox;
