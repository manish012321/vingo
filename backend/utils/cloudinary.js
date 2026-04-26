import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

// ✅ Configure once at startup, not on every upload call
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file)
        fs.unlinkSync(file)
        return result.secure_url
    } catch (error) {
        if (fs.existsSync(file)) fs.unlinkSync(file) // ✅ Only delete if file exists
        console.log(error)
        throw error // ✅ Re-throw so the controller catches it properly
    }
}

export default uploadOnCloudinary