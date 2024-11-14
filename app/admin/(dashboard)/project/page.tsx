import React from "react";
import axios from "axios";
import ProjectOverview from "./_components/ProjectOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllProject = async () => {
  try {
    const response = await axios.get(`${domainName}/api/project`);
    return response.data.projects;
  } catch (error: any) {
    console.log("[ERROR] error in project data fetching: ", error.message);
    return []
  }
}

export default async function ProjectPage() {
  const getProjects = await getAllProject();

  return <ProjectOverview projects={getProjects} />;
}
