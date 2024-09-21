import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import React from "react";

const user: string = process.env.SMTP_USERNAME || "";
const pass: string = process.env.SMTP_PASSWORD || "";

export interface emailData {
    email: string;
    subject: string;
    html: React.ReactElement
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: user,
        pass: pass,
    },
});

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (emailData: emailData) => {
    // send mail with defined transport object
    try {
        const emailHtml = await render(emailData.html);
        const info = await transporter.sendMail({
            from: user, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailHtml, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Email Sending error", error.message)
        throw error
    }
}

export default sendMail