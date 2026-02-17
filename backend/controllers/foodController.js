import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add food item

const addFood = async (req, res) => {

    console.log("📩 Received request - Body:", req.body);
    console.log("📁 File received:", req.file);
    console.log("🔍 All fields:", Object.keys(req.body));
    console.log("🔍 Multer fields:", req.file);

    // Check if file was sent
    if (!req.file) {
        console.log("⚠️ No file in req.file. Checking alternatives...");
        return res.json({ success: false, message: "No image file provided. Make sure field name is 'image' and content-type is multipart/form-data" })
    }

    let image_filename = req.file.filename;
    console.log("✅ Image filename:", image_filename);

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        console.log("✅ Food saved:", food);
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log("❌ Error saving food:", error);
        res.json({ success: false, message: "Error: " + error.message })
    }
}
// delete food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food Removed"})
    } catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood }