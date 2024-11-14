"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { IUser } from "@/lib/models/userSchema";

const Footer = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user`,{
        method:"GET",
        cache:"no-store"
      });
      if(response.ok){
        const data = await response.json()
        setUser(data.user);
      }
    } catch (error: any) {
      console.error('[ERROR] error in fetching user data: ', error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" w-full h-auto pt-6 max-sm:pt-0 bg-slate-300 dark:bg-[#85858535]">
      <div className="  w-full h-full p-5 lg:w-[80%] md:w-[90%] sm:w-[95%] mx-auto">
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:gap-4 md:gap-3 gap-4">
          <div className=" w-full flex flex-col gap-3 items-center justify-start max-md:border-b-2 md:border-r-2 border-slate-700 dark:border-[#b8b8b896] lg:p-3 p-2">
            <p className=" text-lg font-semibold text-gray-700 dark:text-gray-300">
              {" "}
              Thanks for visiting my Portfolio,
            </p>
            <p className=" max-sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              For further importent updateds, stay <br /> connected with me.
            </p>
            <p className=" animate-bounce text-red-500">Have a query?</p>
            {/* contact button */}
            <Link href={"/contact"}>
              <button className=" border font-semibold active:scale-95 duration-200 transition-all ease-in-out hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:border-white border-black  p-2 px-5 flex items-center justify-center gap-x-3">
                Contact me now <Mail size={20} />
              </button>
            </Link>
          </div>
          <div className=" w-full flex flex-col gap-3 max-md:border-b-2 justify-start items-center md:border-r-2 border-slate-700 dark:border-[#b8b8b896] lg:p-3 p-2">
            <p className=" text-lg font-medium mb-2 underline">Address</p>
            <div className=" space-y-3 border-b-4 border-[#85858580] pb-8 max-sm:pb-2">
              <li className=" text-sm font-roboto text-gray-600 dark:text-gray-400">
                Kalyani
              </li>
              <li className=" text-sm font-roboto text-gray-600 dark:text-gray-400">
                Nadia, West Bengal
              </li>
              <li className=" text-sm font-roboto text-gray-600 dark:text-gray-400">
                India
              </li>
            </div>

            <p className=" text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              {" "}
              Follow me on
            </p>
            {loading ? (
              <div className=" w-full pt-5 flex items-center justify-center">
                <Loader2
                  size={35}
                  className=" animate-spin text-blue-500 dark:text-green-500"
                />
              </div>
            ) : (
              <div className=" flex justify-center items-center gap-x-2">
                <Link
                  href={user?.faceBookLink || "https://google.com"}
                  target="_blank"
                >
                  <div className=" w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white">
                    <Facebook />
                  </div>
                </Link>
                <Link
                  href={user?.instaLink || "https://google.com"}
                  target="_blank"
                >
                  <div className=" w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white">
                    <Instagram />
                  </div>
                </Link>
                <Link
                  href={user?.linkdeenLink || "https://google.com"}
                  target="_blank"
                >
                  <div className=" w-10 h-10 duration-200 transition-all active:scale-95 flex justify-center items-center rounded-full hover:bg-blue-500 text-blue-500 border-2 border-blue-500 hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white">
                    <Linkedin />
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className=" w-full flex flex-col gap-3 max-sm:gap-1 items-center justify-start  lg:p-3 p-2">
            <p className=" text">want to see our latest projects?</p>
            <Link href={"/project"}>
              <button className=" text-gray-600 dark:text-gray-400 p-2 px-4 hover:bg-[#89898963] flex items-center gap-x-2">
                latest projects <ArrowRight size={20} />
              </button>
            </Link>
            <div className=" p-2 w-fit border border-gray-500 pl-4 mt-2">
              <p className=" font-poppins mb-2">Our goodwile</p>
              <li className="max-sm:text-sm text-gray-600 dark:text-gray-400">
                Freindly support
              </li>
              <li className="max-sm:text-sm text-gray-600 dark:text-gray-400">
                Instant reply
              </li>
              <li className="max-sm:text-sm text-gray-600 dark:text-gray-400">
                quick solution
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
