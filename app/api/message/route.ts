import sendMail from "@/lib/config/Email";
import receiveMessageEmail from "@/lib/helper/Email-templates/receive-Email";
import SendMessageEmail from "@/lib/helper/Email-templates/send-email";
import { NextRequest, NextResponse } from "next/server";

const user: string = process.env.SMTP_USERNAME || "";
export async function POST(req: NextRequest) {
    try {
        const { userName,
            userEmail,
            message } = await req.json();

        if (!userName || !userEmail || !message) {
            return NextResponse.json({
                success: false,
                message: "PLease fill all the fields"
            }, { status: 400 })
        }
        const email1 = SendMessageEmail({ userName, message, date: new Date })
        const email2 = receiveMessageEmail({ userName, message, date: new Date });
        await sendMail({
            to: userEmail,
            subject: "New Message send",
            html: email1
        })
        await sendMail({
            to: user,
            subject: "New Message send",
            html: email2
        })
        return NextResponse.json({
            success: true,
            message: `Message is send`
        }, { status: 200 })

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}