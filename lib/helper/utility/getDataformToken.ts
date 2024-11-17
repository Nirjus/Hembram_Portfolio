import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET!


export const getDataFromToken = () => {
    try {
        const cookie = cookies()
        const token = cookie.get("token")?.value || ""

        const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

        return decodedToken._id;
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}