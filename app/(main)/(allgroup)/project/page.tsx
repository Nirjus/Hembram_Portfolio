import React from 'react'
import ProjectOverview from '../_components/ProjectOverview';

const domainName = process.env.DOMAIN_NAME!
const getAllProjects = async () => {
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
    console.log("[ERROR] error in fetching projects: ",error.message);
    return []
  }
}
export default async function ProjectsPageU(){

  const result = await getAllProjects()
  return (
    <div className=' w-full min-h-screen h-auto pt-[90px]'>
     <ProjectOverview projects={result} />
      </div>
  )
}
