import cloudinary from "@/lib/config/cloudinary";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Project from "@/lib/models/projectSchema";
import { NextRequest, NextResponse } from "next/server";

const dbCall = async () => {
    await connectDB()
}
dbCall();

export async function DELETE(req: NextRequest) {

    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Ypu are not authorised to access this resources"
            }, { status: 400 })
        }
        const { pathname } = req.nextUrl;
        const projectId = pathname.split("/").pop();

        if (!projectId) {
            return NextResponse.json({
                success: false,
                message: "something went wrong!"
            }, { status: 404 })
        }
        const project = await Project.findById(projectId);
        if (!project) {
            return NextResponse.json({
                success: false,
                message: "Project not found!"
            }, { status: 400 })
        }
        for (const img of project.samplWorks) {
            await cloudinary.v2.uploader.destroy(img.public_id);
        }
        await Project.findByIdAndDelete(projectId);

        return NextResponse.json({
            success: true,
            message: "Project is removed successfully"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in deleting project, ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}