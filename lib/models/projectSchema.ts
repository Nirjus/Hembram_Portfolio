import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    _id: string;
    category: string;
    title: string;
    description: string;
    timeLine: string;
    samplWorks:
    {
        public_id: string,
        url: string
    }[]
    ;
    visitLink: string;
}

const projectSchema: Schema<IProject> = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    timeLine: {
        type: String,
        required: [true, "TimeLine is required field"]
    },
    samplWorks: {
        type: [
            {
                public_id: String,
                url: String
            }
        ],
        validate: {
            validator: (value: any[]) => {
                return value.length <= 4
            },
            message: "You can add a maximum of 4 sample works."
        }
    },
    visitLink: {
        type: String,
        trim: true
    }
})

const Project: Model<IProject> = mongoose.models.projects || mongoose.model<IProject>("projects", projectSchema);

export default Project