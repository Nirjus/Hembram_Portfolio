import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Project from "@/lib/models/projectSchema";
import cloudinary from "@/lib/config/cloudinary";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);
        const { category, title, description, timeLine, visitLink, samplWorks } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const { pathname } = req.nextUrl;
        const projectId = pathname.split('/').pop();

        const project = await Project.findById(projectId);

        if (!project) {
            return NextResponse.json({
                success: false,
                message: "Project not found!"
            }, { status: 400 })
        }
        if (title && title !== project.title) {
            project.title = title
        }
        if (category && category !== project.category) {
            project.category = category
        }
        if (description && description !== project.description) {
            project.description = description;
        }
        if (timeLine && timeLine !== project.timeLine) {
            project.timeLine = timeLine
        }
        if (visitLink !== project.visitLink) {
            project.visitLink = visitLink
        }

        const existingPublicIds = project.samplWorks.map(item => item.url);
        const newPublicIds = samplWorks.map((item: any) => item); // Assuming samplWorks contains public_ids

        if (JSON.stringify(existingPublicIds) !== JSON.stringify(newPublicIds)) {
            const imageArray = [];
            // Upload new images to Cloudinary
            for (const item of samplWorks) {
                const myCloude = await cloudinary.v2.uploader.upload(item, {
                    folder: "hembram-portfolio"
                });
                imageArray.push({
                    public_id: myCloude.public_id,
                    url: myCloude.secure_url
                });
            }
            for (const item of project.samplWorks) {
                if (item.public_id) {
                    await cloudinary.v2.uploader.destroy(item.public_id);
                }
            }
            project.samplWorks = imageArray;
        }

        await project.save();

        return NextResponse.json({
            success: true,
            message: "Project updated successfully"
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}