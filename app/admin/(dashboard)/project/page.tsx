import React from "react";
import ProjectOverview from "./_components/ProjectOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllProject = async () => {
  try {
    const response = await fetch(`${domainName}/api/project`,{
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()
      return data.projects;
    }
  } catch (error: any) {
    console.log("[ERROR] error in project data fetching: ", error.message);
    return []
  }
}

export default async function ProjectPage() {
  const getProjects = await getAllProject();

  return <ProjectOverview projects={getProjects} />;
}
