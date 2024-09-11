import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
    try {
      const {text} = req.body;
      let {img} = req.body;
      const userId = req.user._id.toString();
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!text && !img) {
        return res.status(400).json({ error: "Post must have text or image" });
      }
      if (!img) {
        const uploadedResponse = await cloudinary.uploader.upload(img);
        img = uploadedResponse.secure_url;
      }
      
      const newPost = new Post ({
        uer: userId,
        text,
        img, 
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.log("Error in createPost controller: ", error);    
    }
};