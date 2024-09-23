import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Your are not authorised to access this resources"
            }, { status: 400 })
        }
    } catch (error: any) {
        console.error("Error in update profile picture", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}