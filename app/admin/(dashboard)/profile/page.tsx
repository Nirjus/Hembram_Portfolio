export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
import React from "react";
import ProfileInfoSection from "./_components/ProfileInfoSection";

const domainName = process.env.DOMAIN_NAME!
const refetchUser = async () => {
  try {
    const response = await fetch(`${domainName}/api/user`,{
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
    <ProfileInfoSection user={getUser} />
  );
};

