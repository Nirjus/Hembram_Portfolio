import React from "react";
import SkillOverview from "./_components/SkillOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllSkills = async () => {
  try {
    const response = await fetch(`${domainName}/api/skills`, {
      method:"GET",
      cache:"no-store"
    });
    if(response.ok){
      const data = await response.json()
      return data.skills;
    }
  } catch (error: any) {
    console.error("[ERROR] Failed to fetch skills:", error.message || error);
    return [];
  }
};

export default async function SkillPage() {
  const skills = await getAllSkills();
  return <SkillOverview skills={skills} />;
}
