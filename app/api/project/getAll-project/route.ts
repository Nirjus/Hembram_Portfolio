import { NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Project from "@/lib/models/projectSchema";

const dbCall = async () => {
    await connectDB()
}
dbCall();


export async function POST() {
    try {
        const projects = await Project.find({}).sort({ createdAt: -1 });

        const response = NextResponse.json({
            success: true,
            message: "Projects returned successfully",
            projects
        }, { status: 200 });

        // Disable caching with Cache-Control headers
        response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

        return response;

    } catch (error: any) {
        console.error("Projects are not fetched, ", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}