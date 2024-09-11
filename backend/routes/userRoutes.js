import express from 'express';
import { protectRoute, 
         getUserProfile, 
         followUnfollowUser, 
         getSuggestedUsers } 
         from '../controllers/userController.js';

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

export default router;