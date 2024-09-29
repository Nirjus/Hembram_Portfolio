import { NextResponse } from "next/server"
import connectDB from "@/lib/config/DB"
import User from "@/lib/models/userSchema";

const userEmail = process.env.USER_EMAIL!;

export async function POST() {
    await connectDB()
    try {

        const user = await User.findOne({ email: userEmail });

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

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}