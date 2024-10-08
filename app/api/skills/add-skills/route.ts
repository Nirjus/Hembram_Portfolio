import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Skills from "@/lib/models/skillsSchema";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const userId = getDataFromToken(req);
        const { name, description } = await req.json();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Your are not authorised to access this resources"
            }, { status: 400 })
        }
        if (!name || !description) {
            return NextResponse.json({
                success: false,
                message: "please provide all information"
            }, { status: 400 })
        }
        const skill = await Skills.create({
            name: name,
            description: description
        })

        return NextResponse.json({
            success: true,
            message: "Skill added",
            skill
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}