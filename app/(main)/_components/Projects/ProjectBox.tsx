"use client";
import { ArrowRightCircle, CalendarArrowDown } from "lucide-react";
import React from "react";
import ProjectBoxAnimation from "../Animations/ProjectBoxAnimation";
import Image from "next/image";
import { IProject } from "@/lib/models/projectSchema";
import { useRouter } from "next/navigation";

type Props = {
  item:IProject
  index: number;
};

const ProjectBox = ({ item, index }: Props) => {
  const router = useRouter();

  const navigateHandler = () => {
      const jsonItem = JSON.stringify(item);
    router.push(`/project/${encodeURIComponent(jsonItem)}`)
  }
  return (
   <ProjectBoxAnimation delay={index}>
     <div className=" w-full rounded-xl h-auto bg-slate-500/30 hover:bg-slate-400/40 shadow-md border border-slate-500/20 dark:bg-slate-700/30 dark:hover:bg-slate-600/30  backdrop-blur backdrop-filter md:p-4 p-3">
      <Image
        alt={`sample-image-${item._id}`}
        height={1000}
        width={1000}
        src={item?.samplWorks[0]?.url}
        className=" object-cover aspect-video w-full rounded-xl"
      />
      <div className=" mt-2">
        <h2 className=" md:text-2xl sm:text-xl text-lg font-poppins text-zinc-700 font-medium dark:text-zinc-300">
          {item.title}
        </h2>
        <p>Created by Hembram</p>
        <div className=" h-fit mt-4 flex justify-between items-center">
          <button className=" transition-all duration-300 ease-in-out lg:text-lg p-2 rounded-md bg-blue-500 text-white border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 flex items-center gap-x-3 justify-center dark:bg-green-500 dark:text-white dark:border-green-500 dark:hover:bg-transparent dark:hover:text-green-500"
          onClick={navigateHandler}
          >
            Details <ArrowRightCircle size={20} />
          </button>
          <div className=" text-sm max-400px:text-[10px] flex items-center gap-4 rounded-lg p-1 bg-white dark:bg-[#1c1c1c]">
            <CalendarArrowDown />
            <div>
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
