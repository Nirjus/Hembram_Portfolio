import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";

const jwtForgotPassSecret = process.env.JWT_FORGOT_PASS_SECRET!

export async function POST(req: Request) {
    await connectDB()
    try {
        const { token, newPassword, confirmPassword } = await req.json();
        if (!token) {
            return NextResponse.json({
                success: false,
                message: "token lost"
            }, { status: 400 })
        }
        const verifiedToken = jwt.verify(token, jwtForgotPassSecret) as JwtPayload;
        if (!verifiedToken) {
            return NextResponse.json({
                success: false,
                message: "token is invalid now"
            }, { status: 400 })
        }
        const user = await User.findById(verifiedToken._id).select("+password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "user not found!"
            }, { status: 400 })
        }
        if (newPassword !== confirmPassword) {
            return NextResponse.json({
                success: false,
                message: "confirm password not matched"
            }, { status: 400 })
        }

        user.password = confirmPassword;
        await user.save();

        return NextResponse.json({
            success: true,
            message: "Password reset seccessfully"
        }, { status: 200 })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("reset password error", error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}