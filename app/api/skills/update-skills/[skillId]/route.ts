import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Skills from "@/lib/models/skillsSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = await getDataFromToken(req);
        const { name, description } = await req.json();
        const { pathname } = req.nextUrl;
        const skillId = pathname.split('/').pop();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const skill = await Skills.findById(skillId);
        if (!skill) {
            return NextResponse.json({
                success: false,
                message: "Skill not found"
            }, { status: 400 })
        }
        if (name) {
            skill.name = name
        }
        if (description) {
            skill.description = description
        }

        await skill.save();

        return NextResponse.json({
            success: true,
            message: "Skill updated"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in update skills", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}