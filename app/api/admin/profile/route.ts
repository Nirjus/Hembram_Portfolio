import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/config/DB"
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken"
import User from "@/lib/models/userSchema";


export async function POST(request: NextRequest) {
    await connectDB()
    try {
        const userId = getDataFromToken(request);

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "No user found"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            message: "User found",
            user
        }, { status: 200 })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}