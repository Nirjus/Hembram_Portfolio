export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
import React from "react";
import Hero from "./_components/Hero/Hero";
import Skills from "./_components/Skils/Skills";
import Projects from "./_components/Projects/Projects";
import Services from "./_components/Services/services";
import SideToggleBar from "./_components/sideToggleBar";

const domainName = process.env.DOMAIN_NAME!
const getUser = async () => {
  try {
    const response = await fetch(`${domainName}/api/user/profile`,{
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()
      return data.user
    }
  } catch (error: any) {
    console.log("[ERROR] error in fetching user: ",error.message);
    return null;
  }
}
const getSkills = async () => {
  try {
    const response = await fetch(`${domainName}/api/skills`,{
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()      
      return data.skills;
    }
  } catch (error: any) {
    console.log("[ERROR] error in fetching skills: ", error.message);
    return []
  }
}
const getProjects = async () => {
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
const getServices = async () => {
  try {
    const response = await fetch(`${domainName}/api/service`,{
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()
      return data.services;
    }
  } catch (error: any) {
    console.error("[ERROR] error in fetching services: ", error.message);
    return []
  }
}
export default async function HomePage() {
const [resultUser,resultSkills,resultProjects,resultServices] = await Promise.all([
  getUser(),
  getSkills(),
  getProjects(),
  getServices()
])

  return (
    <div className=" relative main-background">
    <SideToggleBar />
      <section id="home">
        <Hero user={resultUser} />
      </section>
      <section id="skills">
        <Skills skills={resultSkills} />
      </section>
      <section id="project">
        <Projects projects={resultProjects} />
      </section>
      <section id="services">
        <Services services={resultServices} />
      </section>
    </div>
  );
};

