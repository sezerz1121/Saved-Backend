import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import  dotenv  from "dotenv";
import path from 'path';
dotenv.config();

cloudinary.config({ 
  cloud_name:`${process.env.cloud_name}` , 
  api_key: `${process.env.api_key}`, 
  api_secret: `${process.env.api_secret}` 
});



const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Normalize the file path to ensure it's in the correct format
        const normalizedPath = path.normalize(localFilePath);
        console.log("in cloudinary", normalizedPath);

        if (!normalizedPath) return null;

        const response = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: "auto"
        });

        console.log("in cloudinary", response);

        // File uploaded successfully
        console.log("File has been uploaded successfully", response.secure_url);

        fs.unlinkSync(normalizedPath);
        return response;
    } catch (error) {
        console.error("Error during Cloudinary upload:", error.message);

        // Safely delete the file only if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        
        return null;
    }
}



export {uploadOnCloudinary};