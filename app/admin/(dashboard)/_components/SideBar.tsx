"use client";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  routes: { itemName: string; route: string; icon: LucideIcon }[];
};

const SideBar = ({ routes }: Props) => {
  const [selected, setSelected] = useState(0);
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
     const currentIndex = routes.findIndex(route => route.route === pathname);
     if(currentIndex !== -1){
        setSelected(currentIndex);
     }
  },[pathname, routes])
 
  const onClickHandler = (index: number,route: string) => {
    setSelected(index);
    router.push(route)
  }
  return (
    <aside className=" fixed inset-y-0 h-full mt-[80px] lg:pt-4 pt-1 z-40 xl:w-[300px] lg:w-[250px] md:w-[190px] w-[80px] bg-[#83838335] dark:bg-[#7171714f]  backdrop-blur backdrop-filter">
      <div className=" space-y-3">
        {routes.map((item, index) => (
            <div
             key={index}
             onClick={() => onClickHandler(index,item.route)}
              className={` relative lg:p-3 p-2 flex items-center hover:bg-slate-400/30 hover:dark:bg-slate-500/20 lg:gap-x-4 gap-x-3 max-lg:justify-center justify-start ${
                index === selected ? "bg-slate-400/30 dark:bg-slate-500/20" : "bg-transparent"
              }`}
            >
            <div className=" p-2 bg-[#8a8a8a6c] rounded-md">
            <item.icon size={20} />
            </div>
              <p className=" font-poppins max-lg:hidden">{item.itemName}</p>
              <div
                className={`absolute right-0 top-0 h-full w-1 ${
                  index === selected
                    ? "bg-blue-500 dark:bg-green-500"
                    : "bg-transparent"
                }`}
              />
            </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
