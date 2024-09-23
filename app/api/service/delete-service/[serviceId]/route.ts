import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/config/DB";
import Service from "@/lib/models/serviceSchema";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";


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
        const serviceId = pathname.split('/').pop();

        await Service.findByIdAndDelete(serviceId);

        return NextResponse.json({
            success: true,
            message: "Service is removed"
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in  deleting services", error.message);
        return NextResponse.json({
            success: false,
            messge: error.message
        }, { status: 500 })
    }
}