import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    await connectDB()
    try {
        const userId = getDataFromToken();
        const { name, description, subHeading } = await req.json();
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
                message: "Error in finding user"
            }, { status: 400 })
        }
        if(name && user.name !== name){
            user.name = name
        }
        if(description && user.description !== description){
            user.description = description
        }
        if(subHeading && user.subHeading !== subHeading){
            user.subHeading = subHeading
        }
        await user.save()
          
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