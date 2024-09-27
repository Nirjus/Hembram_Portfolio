import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);
        const { name, description, subHeading } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const user = await User.findByIdAndUpdate(userId, {
            name: name,
            description: description,
            subHeading: subHeading
        })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Error in updating user"
            }, { status: 400 })
        }
        return NextResponse.json({
            success: true,
            message: "User Info updated"
        }, { status: 200 })

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}