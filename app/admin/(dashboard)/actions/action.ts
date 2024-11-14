import connectDB from "@/lib/config/DB";
import Project from "@/lib/models/projectSchema";
import Skills from "@/lib/models/skillsSchema";

const domainNAme = process.env.DOMAIN_NAME!
export async function fetchAllUserData() {
    await connectDB();
    try {
        const response = await fetch(`${domainNAme}/api/user`,{
            method:"GET",
            cache:"no-store"
        })
        if(response.ok){
        const userData = await response.json()
        const user = userData.user;
        const projectsCount = await Project.countDocuments();
        const skillsCount = await Skills.countDocuments();
        const data = { ...user, projectsCount, skillsCount }
        return {
            success: true,
            message: "All data are return",
            data
        }
    }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}