import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";


export async function POST(req: Request) {
    await connectDB();
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return Response.json({
                success: false,
                message: "please provide all information"
            }, { status: 500 })
        }
        const userExists = await User.exists({ email: email });
        if (userExists) {
            return Response.json({
                success: false,
                message: "user already exists"
            }, { status: 400 })
        }
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
        return Response.json({
            success: true,
            message: "User Register successfully",
            user
        }, { status: 201 })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error.message);
        return Response.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}