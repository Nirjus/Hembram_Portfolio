import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import cloudinary from "@/lib/config/cloudinary";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken();
        const { pdf } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Error in updating user"
            }, { status: 400 })
        }

        if (user.cvFile?.public_id) {
            await cloudinary.v2.uploader.destroy(user.cvFile?.public_id);
        }
        const myCLoude = await cloudinary.v2.uploader.upload(pdf, {
            resource_type: "auto",
            folder: "hembram-portfolio"
        })

        const cvFile = {
            public_id: myCLoude.public_id,
            url: myCLoude.secure_url
        }
        user.cvFile = cvFile;

        await user.save();
        return NextResponse.json({
            success: true,
            message: "Your CV is updated",
            user
        }, { status: 200 })

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}