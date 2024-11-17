import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken();
        const { faceBookLink, instaLink, linkdeenLink } = await req.json();
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
        if (faceBookLink !== user.faceBookLink) {
            user.faceBookLink = faceBookLink
        }
        if (linkdeenLink !== user.linkdeenLink) {
            user.linkdeenLink = linkdeenLink
        }
        if (instaLink !== user.instaLink) {
            user.instaLink = instaLink
        }

        await user.save();
        return NextResponse.json({
            success: true,
            message: "User Info updated",
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