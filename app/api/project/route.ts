import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Project from "@/lib/models/projectSchema";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import cloudinary from "@/lib/config/cloudinary";

(async function(){
   await connectDB()
})()

export async function GET() {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: false,
            message: "Projects are return successfully",
            projects
        }, { status: 200 })

    } catch (error: any) {
        console.error("Projects are not fetched, ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        const { category, title, description, timeLine, visitLink, samplWorks } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        if (!category || !title || !description || !timeLine || !samplWorks) {
            return NextResponse.json({
                success: false,
                message: "please provide all information"
            }, { status: 404 })
        }
        const uploadImages = [];
        for (const img of samplWorks) {
            const myCloude = await cloudinary.v2.uploader.upload(img, {
                folder: "hembram-portfolio"
            })
            uploadImages.push({
                public_id: myCloude.public_id,
                url: myCloude.secure_url
            })
        }
        // const photo = 
        await Project.create({
            title: title,
            category,
            description: description,
            timeLine: timeLine,
            visitLink,
            samplWorks: uploadImages
        })

        return NextResponse.json({
            success: true,
            message: "Project successfully created"
        }, { status: 201 })
    } catch (error: any) {
        console.error("Error in project creation ", error.message);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Ypu are not authorised to access this resources"
            }, { status: 400 })
        }
        const {searchParams} = new URL(req.url)
        const projectId = searchParams.get("projectId")

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

export async function PUT(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        const { category, title, description, timeLine, visitLink, samplWorks } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const {searchParams} = new URL(req.url)
        const projectId = searchParams.get("projectId")

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