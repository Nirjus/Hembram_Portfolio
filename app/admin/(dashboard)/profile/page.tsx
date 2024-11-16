export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
import React from "react";
import ProfileInfoSection from "./_components/ProfileInfoSection";
import { ShieldCheck } from "lucide-react";

const domainName = process.env.DOMAIN_NAME!
const refetchUser = async () => {
  try {
    const response = await fetch(`${domainName}/api/user/profile`,{
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()
     return data?.user
    }
  } catch (error: any) {
    console.log("[ERROR] error in fetching user: ", error.message);
    return null
  }
};

export default async function Profile(){
  const getUser = await refetchUser()

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
          <ProfileInfoSection user={getUser} />
    </section>
  );
};

