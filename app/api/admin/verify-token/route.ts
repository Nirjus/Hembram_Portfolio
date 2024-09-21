import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const jwtSecret = process.env.JWT_SECRET!

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1] || "";

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Token not found"
            }, { status: 401 });
        }
        const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

        if (!decodedToken) {
            return NextResponse.json({
                success: false,
                message: "Token expired"
            }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            decodedToken
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}