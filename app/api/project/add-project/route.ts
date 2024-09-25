import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/config/cloudinary";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Project from "@/lib/models/projectSchema";

export async function POST(req: NextRequest) {
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
