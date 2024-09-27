import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Project from "@/lib/models/projectSchema";

export async function GET() {
    await connectDB();
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: false,
            message: "Projects are return successfully",
            projects
        }, { status: 200 })

    } catch (error: any) {
        console.error("Projects are not fetched, ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}