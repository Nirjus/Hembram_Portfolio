import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISkills extends Document {
    _id: string;
    name: string;
    description: string;
}

const skillsSchema: Schema<ISkills> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Skills: Model<ISkills> = mongoose.models.skills || mongoose.model<ISkills>("skills", skillsSchema);

export default Skills