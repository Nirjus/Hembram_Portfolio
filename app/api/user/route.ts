import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";

(async function(){
  await connectDB()
})()

export async function GET() {
    try {
        const user = await User.findOne({});
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
