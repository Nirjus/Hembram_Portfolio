import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

const jwtSecret: string = process.env.JWT_SECRET!


export const getDataFromToken = (req: NextRequest) => {
    try {

        const token = req.cookies.get('token')?.value || ""

        const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

        return decodedToken._id;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}