import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB"
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Skills from "@/lib/models/skillsSchema";


(async function (){
  await connectDB()
})()


export async function GET() {
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

export async function POST(req: NextRequest) {
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


export async function PUT(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const { name, description } = await req.json();
        const { searchParams } = new URL(req.url)
        const skillId = searchParams.get("skillId")

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
            message: "Skill updated",
            skill
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in update skills", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resource"
            }, { status: 400 })
        }
        const { searchParams } = new URL(req.url);
        const skillId = searchParams.get("skillId");

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