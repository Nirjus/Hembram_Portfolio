import mongoose, { Schema, Document, Model } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    subHeading: string;
    description: string;
    photos: string[];
    isAdmin: boolean;
}
const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false,
        set: (v: string) => bcryptjs.hashSync(v, bcryptjs.genSaltSync(10))
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Please enter a valid email"
        }
    },
    subHeading: {
        type: String
    },
    description: {
        type: String
    },
    photos: [
        {
            type: String
        }
    ]
})

const User: Model<IUser> = mongoose.models.users || mongoose.model<IUser>("users", userSchema);
export default User