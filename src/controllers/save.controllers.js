import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Saved } from "../models/save.models.js";
import { User } from "../models/user.models.js";
import axios from "axios";
import * as cheerio from "cheerio";


// Function to fetch OpenGraph tags and extract the image
const fetchOgImage = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');
    return ogImage || null;
  } catch (error) {
    console.error("Error fetching OG image:", error.message);
    return null;
  }
};

const createSave = asyncHandler(async (req, res) => {
  const { userID, content } = req.body;

  // Validate user existence
  const Existuser = await User.findOne({ _id: userID });
  if (!Existuser) {
    throw new ApiError(409, "Username or Email does not exist");
  }

  // Validate content
  if (!content) {
    throw new ApiError(409, "Content is empty");
  }

  let imageUrl = null;

  // Check if content is a valid URL
  const isValidUrl = (text) => {
    const urlRegex = /^(https?:\/\/[^\s]+)$/;
    return urlRegex.test(text);
  };

  if (isValidUrl(content)) {
    // Fetch OpenGraph image if content is a URL
    imageUrl = await fetchOgImage(content);
  }

  // Create save entry in the database
  const save = await Saved.create({
    user: userID,
    content,
    imageUrl, // May be null if no og:image exists
  });

  if (!save) {
    throw new ApiError(500, "Something went wrong");
  }

  return res.status(201).json(new ApiResponse(200, "Saved successfully"));
});



const savedCardList = asyncHandler(async (req, res) => {
    const { userId } = req.body; 
    
   
    
       
        if(!userId)
       {
             throw new ApiError(400, "user does not exist");
       }
 
        
       const cardList = await Saved.find({ user: { $in: userId } });
 
       
        
        return res.status(200).json(
          new ApiResponse(200, cardList, "cardList fetch successfully")
        );
    
    
 });
 

export{
    createSave,
    savedCardList
}