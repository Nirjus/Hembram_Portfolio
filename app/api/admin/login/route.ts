import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";

const jwtSecret: string = process.env.JWT_SECRET!

export async function POST(req: Request) {
    await connectDB()

    try {
        const { email, password } = await req.json();

        if (!email && !password) {
            return NextResponse.json({
                success: false,
                message: "Please provide all informatiom"
            }, { status: 400 })
        }
        const user = await User.findOne({ email: email }).select("+password");

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User is not Admin"
            }, { status: 400 })
        }
        if (!user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "User is not Admin"
            }, { status: 400 })
        }
        const comparePassword = await bcryptjs.compare(password, user.password!);
        if (!comparePassword) {
            return NextResponse.json({
                success: false,
                message: "Password not matched"
            }, { status: 400 })
        }
        const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1d" });

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        const response = NextResponse.json({
            success: true,
            message: "Login success",
            user: userWithoutPassword
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            path: "/",
            secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "lax",
        })
        return response

    } catch (error: any) {
        console.error("Error returning response:", error.message);
        return NextResponse.json({
            success: false,
            message: "Faild to login"
        }, {
            status: 500
        })
    }
}