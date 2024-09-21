import mongoose from "mongoose";

let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log("DB is connected already");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017")
        console.log(`Database is connected: ${mongoose.connection.host}`);
        isConnected = true;
    } catch (error) {
        console.log("Database connection failed")
        console.error(error);
        process.exit(1)
    }
}

export default connectDB