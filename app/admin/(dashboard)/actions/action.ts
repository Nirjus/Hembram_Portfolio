import connectDB from "@/lib/config/DB";
import Project from "@/lib/models/projectSchema";
import Skills from "@/lib/models/skillsSchema";
import User from "@/lib/models/userSchema";

export async function fetchAllUserData() {
    await connectDB();
    try {
       const user = await User.find({})
        const projectsCount = await Project.countDocuments();
        const skillsCount = await Skills.countDocuments();
        const userObj = JSON.parse(JSON.stringify(user.at(0)))
        const data = { ...userObj, projectsCount, skillsCount }
        return {
            success: true,
            message: "All data are return",
            data
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}