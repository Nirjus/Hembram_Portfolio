import React from "react";
import ServiceOverview from "./_components/ServiceOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllServices = async () => {
  try {
    const response = await fetch(`${domainName}/api/service`, {
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json();
      return data.services;
    }
  } catch (error: any) {
    console.log(
      "[ERROR]: error in fetching service data: ",
      error.message || error
    );
    return [];
  }
};

export default async function ServicePage() {
  const fetchedData = await getAllServices();
  return <ServiceOverview services={fetchedData} />;
}
