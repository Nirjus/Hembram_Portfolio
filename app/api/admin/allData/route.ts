import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Project from "@/lib/models/projectSchema";
import Skills from "@/lib/models/skillsSchema";
import User from "@/lib/models/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found"
            }, { status: 400 })
        }

        const projectsCount = await Project.countDocuments();
        const skillsCount = await Skills.countDocuments();
        const data = { ...user.toObject(), projectsCount, skillsCount }
        return NextResponse.json({
            success: true,
            message: "All data are return successfully",
            data
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}