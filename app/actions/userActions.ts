'use server'
import cloudinary from "@/lib/config/cloudinary";
import connectDB from "@/lib/config/DB";
import { getDataFromToken } from "@/lib/helper/utility/getDataformToken";
import User from "@/lib/models/userSchema";
import { revalidatePath } from "next/cache";

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
export async function userUpdate(formData:{name:string,description: string, subHeading:string}, pathTorevalidate: string) {
    await connectDB()
    try {
        const userId = getDataFromToken();
        const { name, description, subHeading } = formData;
        if (!userId) {
            return {
                success: false,
                message: "You are not authorised to access this resources"
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "Error in finding user"
            }
        }
        if(name && user.name !== name){
            user.name = name
        }
        if(description && user.description !== description){
            user.description = description
        }
        if(subHeading && user.subHeading !== subHeading){
            user.subHeading = subHeading
        }
        await user.save()
        revalidatePath(pathTorevalidate)
        return {
            success: true,
            message: "User Info updated",
        }

    } catch (error: any) {
        console.error(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}


export async function addLinks(links:{faceBookLink:string, instaLink:string, linkdeenLink:string}, pathTorevalidate: string) {
    await connectDB();
    try {
        const userId = getDataFromToken();
        const { faceBookLink, instaLink, linkdeenLink } = links;
        if (!userId) {
            return {
                success: false,
                message: "You are not authorised to access this resources"
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "Error in updating user"
            }
        }
        if (faceBookLink !== user.faceBookLink) {
            user.faceBookLink = faceBookLink
        }
        if (linkdeenLink !== user.linkdeenLink) {
            user.linkdeenLink = linkdeenLink
        }
        if (instaLink !== user.instaLink) {
            user.instaLink = instaLink
        }

        await user.save();
        revalidatePath(pathTorevalidate)
        return {
            success: true,
            message: "User Info updated",
        }
    } catch (error: any) {
        console.error(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}

export async function updatePhotos(photos: string[],pathTorevalidate:string) {
    await connectDB();
    try {
        const userId = getDataFromToken();
        if (!userId) {
            return {
                success: false,
                message: "You are not authorised to access this resources"
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }
        const existingUrls = user.photos.map((item) => item.url);
        const newUrls = photos.map((item: any) => item);

        if (JSON.stringify(existingUrls) !== JSON.stringify(newUrls)) {
            const imageArray = [];
            for (const item of photos) {
                const myCloude = await cloudinary.v2.uploader.upload(item, {
                    folder: "hembram-portfolio"
                })

                imageArray.push({
                    public_id: myCloude.public_id,
                    url: myCloude.secure_url
                })
            }
            for (const item of user.photos) {
                if (item.public_id) {
                    await cloudinary.v2.uploader.destroy(item.public_id);
                }
            }
            user.photos = imageArray;
        }
        await user.save();
        revalidatePath(pathTorevalidate)
        return {
            success: true,
            message: "Profile picture updated",
        }

    } catch (error: any) {
        console.error("Error in updating image: ", error.message);
        return {
            success: false,
            message: error.message
        }
    }
}
export async function updateCV(pdf:string, pathTorevalidate: string) {
    await connectDB();
    try {
        const userId = getDataFromToken();
        if (!userId) {
            return {
                success: false,
                message: "You are not authorised to access this resources"
            }
        }
        const user = await User.findById(userId);
        if (!user) {
            return {
                success: false,
                message: "Error in updating user"
            }
        }

        if (user.cvFile?.public_id) {
            await cloudinary.v2.uploader.destroy(user.cvFile?.public_id);
        }
        const myCLoude = await cloudinary.v2.uploader.upload(pdf, {
            resource_type: "auto",
            folder: "hembram-portfolio"
        })

        const cvFile = {
            public_id: myCLoude.public_id,
            url: myCLoude.secure_url
        }
        user.cvFile = cvFile;

        await user.save();
        revalidatePath(pathTorevalidate)
        return {
            success: true,
            message: "Your CV is updated",
        }

    } catch (error: any) {
        console.error(error.message);
        return {
            success: false,
            message: error.message
        }
    }
}