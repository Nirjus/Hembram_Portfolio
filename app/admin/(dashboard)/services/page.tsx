import React from "react";
import axios from "axios";
import ServiceOverview from "./_components/ServiceOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllServices = async () => {
  try {
    const response = await axios.get(`${domainName}/api/service`, {
      headers: {
        "Cache-Control": "no-store", // Prevent caching
      },
    });
    return response.data.services;
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
