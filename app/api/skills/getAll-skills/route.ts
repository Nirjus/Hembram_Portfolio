import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Skills from "@/lib/models/skillsSchema";


export async function POST() {
    await connectDB();
    try {
        const skills = await Skills.find({});
        return NextResponse.json({
            success: true,
            message: "Skill are here",
            skills
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}