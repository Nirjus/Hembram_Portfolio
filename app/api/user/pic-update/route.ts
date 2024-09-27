import cloudinary from "@/lib/config/cloudinary";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);
        const { photos } = await req.json();
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
                message: "User not found"
            }, { status: 400 })
        }
        const existingUrls = user.photos.map((item) => item.url);
        const newUrls = photos.map((item: any) => item);

        if (JSON.stringify(existingUrls) !== JSON.stringify(newUrls)) {
            const imageArray = [];
            for (const item of photos) {
                const myCloude = await cloudinary.v2.uploader.upload(item, {
                    folder: "hembram-portfolio"
                })

                imageArray.push({
                    public_id: myCloude.public_id,
                    url: myCloude.secure_url
                })
            }
            for (const item of user.photos) {
                if (item.public_id) {
                    await cloudinary.v2.uploader.destroy(item.public_id);
                }
            }
            user.photos = imageArray;
        }
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Profile picture updated"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in updating image: ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}