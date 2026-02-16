import express from "express"
import { addFood, listFood} from "../controllers/foodController.js"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// image Storage 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../uploads");
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        console.log("🔍 Multer fileFilter - File received:", file.originalname);
        cb(null, true);
    }
})

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listFood)






export default foodRouter;