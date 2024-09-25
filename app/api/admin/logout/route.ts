import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, { status: 200 })
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Match your login settings
            sameSite: "lax", // Match this with your login cookie settings
            expires: new Date(0),
            path: "/", // Ensures cookie is removed from all paths
        })
        return response
    } catch (error: any) {
        console.log("Error in logout", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}