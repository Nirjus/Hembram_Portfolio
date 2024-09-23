import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Service from "@/lib/models/serviceSchema";


export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const services = await Service.find({});
        return NextResponse.json({
            success: true,
            message: "Services updated",
            services
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}