import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";
import Email from "@/lib/helper/Email-templates/forgot-password-email";
import sendMail from "@/lib/config/Email";

const domainName = process.env.DOMAIN_NAME!
const jwtForgotPassSecret = process.env.JWT_FORGOT_PASS_SECRET!

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Please provide email"
            }, { status: 400 })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not exists with this email"
            }, { status: 400 })
        }
        const token = jwt.sign({ _id: user._id }, jwtForgotPassSecret, { expiresIn: "5m" })
        const url = `${domainName}/admin/reset-password?token=${token}`
        const emailHtml = Email({ userName: user.name, url: url })

        await sendMail({ to: email, subject: "Password reset email", html: emailHtml });

        return NextResponse.json({
            success: true,
            message: `Please chacke your email: ${user.email} , password reset link is send`
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}