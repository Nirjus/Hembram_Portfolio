import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const { name, description, subHeading } = await req.json();
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Your are not authorised user"
            }, { status: 400 })
        }
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }
        if (name) {
            user.name = name;
        }
        if (description) {
            user.description = description;
        }
        if (subHeading) {
            user.subHeading = subHeading
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: "user updated successfully"
        }, { status: 201 })

    } catch (error: any) {
        console.error("Error in updating profile", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }), { status: 500 }
    }
}