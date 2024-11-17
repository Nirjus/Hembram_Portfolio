'use server'
import connectDB from "@/lib/config/DB";
import User from "@/lib/models/userSchema";

export async function fetchUser(){
    await connectDB()
    try {
      const user = await User.findOne({})
      if(!user){
        return {
            success: false,
            message: "No user found",
            user: null
        }
      }
      return{
        success: true,
        message: "User is found",
        user: JSON.parse(JSON.stringify(user))
      }
    } catch (error) {
        return{
            success: false,
            message: "[ERROR] error in finding user",
            user: null
        }
    }
}