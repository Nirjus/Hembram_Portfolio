"use client";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { UserProvider } from "../../context/UserContext";
import { profilePages } from "../constants/profileRoutes";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <section className=" w-full">
      <div className=" flex items-center justify-center gap-x-5 xl:text-4xl lg:text-3xl md:text-2xl text-2xl font-poppins font-extrabold">
        <h1 className=" bg-clip-text text-transparent bg-gradient-to-r  inline-block from-blue-500 to-indigo-700 dark:from-green-500 dark:to-emerald-700">
          ADMIN
        </h1>
        <div className=" bg-gray-400/30 rounded-full lg:p-2 p-1">
          <ShieldCheck className=" text-blue-500 dark:text-green-500" />
        </div>
      </div>
      <div className="w-full relative">
        <div className=" max-xl:mt-5 flex flex-col items-center justify-start gap-3 max-xl:flex-row xl:absolute top-0  right-10 h-full border-dashed p-4 border-2 border-[#7f7f7f8a]">
          {profilePages.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => router.push(item.link)}
              className=" active:scale-95 flex items-center justify-center duration-200 ease-in-out border-b border-[#8b8b8b2b] transition-all h-10 max-xl:w-fit px-2 w-[150px] hover:bg-[#8b8b8b2b]"
            >
              <span className=" xl:hidden">{<item.icon size={20} />}</span>
              <span className=" max-xl:hidden">{item.routeName}</span>
            </button>
          ))}
        </div>
        <UserProvider>{children}</UserProvider>
      </div>
    </section>
  );
}
