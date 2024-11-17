import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import Service from "@/lib/models/serviceSchema";
import { NextRequest, NextResponse } from "next/server";

(async function() {
 await connectDB()      
})()

export async function GET() {
    try {
        const services = await Service.find({});
        return NextResponse.json({
            success: true,
            message: "Services are here",
            services
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
        const userId = getDataFromToken();
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
        const service = await Service.create({
            name: name,
            description: description
        })

        return NextResponse.json({
            success: true,
            message: "Service added",
            service
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
        const userId = await getDataFromToken();
        const { name, description } = await req.json();
        const { searchParams } = new URL(req.url);
        const serviceId = searchParams.get("serviceId");

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
            message: "Service updated",
            service
        }, { status: 200 })

    } catch (error: any) {
        console.error("Error in update services", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB()
    try {
        const userId = getDataFromToken();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "You are not authorised to access this resource"
            }, { status: 400 })
        }
        const { searchParams } = new URL(req.url);
        const serviceId = searchParams.get("serviceId");

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