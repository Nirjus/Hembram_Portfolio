import axios from "axios";
import React from "react";
import SkillOverview from "./_components/SkillOverview";

const domainName = process.env.DOMAIN_NAME!;
const getAllSkills = async () => {
  try {
    const response = await axios.get(`${domainName}/api/skills`, {
      headers: {
        "Cache-Control": "no-store", // Prevent caching
      },
    });

    return response.data.skills;
  } catch (error: any) {
    console.error("Failed to fetch skills:", error.message || error);
    return [];
  }
};

export default async function SkillPage() {
  const skills = await getAllSkills();
  return <SkillOverview skills={skills} />;
}
