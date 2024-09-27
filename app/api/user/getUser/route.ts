import { NextResponse } from "next/server"
import connectDB from "@/lib/config/DB"
import User from "@/lib/models/userSchema";


export async function GET() {
    await connectDB()
    try {
        const email = "karmakarnirjus4839@gmail.com";
        const user = await User.findOne({ email: email });

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