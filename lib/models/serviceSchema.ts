import mongoose, { Document, Schema, Model } from "mongoose";

export interface IServices extends Document {
    name: string;
    description: string;
}

const serviceSchema: Schema<IServices> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Service: Model<IServices> = mongoose.models.services || mongoose.model<IServices>("services", serviceSchema);

export default Service