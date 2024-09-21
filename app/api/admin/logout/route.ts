import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, { status: 200 })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Error in logout", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}