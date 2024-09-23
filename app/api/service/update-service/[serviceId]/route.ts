import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Service from "@/lib/models/serviceSchema";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const userId = await getDataFromToken(req);
        const { name, description } = await req.json();
        const { pathname } = req.nextUrl;
        const serviceId = pathname.split('/').pop();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resources"
            }, { status: 400 })
        }
        const service = await Service.findById(serviceId);
        if (!service) {
            return NextResponse.json({
                success: false,
                message: "service not found"
            }, { status: 400 })
        }
        if (name) {
            service.name = name
        }
        if (description) {
            service.description = description
        }

        await service.save();

        return NextResponse.json({
            success: true,
            message: "Service updated"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in update services", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}