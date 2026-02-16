import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://seraoturjo:confirmturjo@cluster0.lndskke.mongodb.net/tomato');
        console.log("✅ MongoDB Atlas Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
    }
}