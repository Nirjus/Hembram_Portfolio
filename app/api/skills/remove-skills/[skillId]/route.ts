import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Skills from "@/lib/models/skillsSchema";


export async function DELETE(req: NextRequest) {
    await connectDB()
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resource"
            }, { status: 400 })
        }
        const { pathname } = req.nextUrl;
        const skillId = pathname.split('/').pop();

        await Skills.findByIdAndDelete(skillId);

        return NextResponse.json({
            success: true,
            message: "Skill removed"
        }, { status: 200 })
    } catch (error: any) {
        console.error("Error in  deleting skill", error.message);
        return NextResponse.json({
            success: false,
            messge: error.message
        }, { status: 500 })
    }
}