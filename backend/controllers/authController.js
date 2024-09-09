import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
      const {fullName, username, email, password} = req.body;
      
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username is already taken" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      // hash password

      const salt = await bcrypt.genSalt(10);  // 10 is recommended
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        fullName,
        username,
        email,
        password: hashedPassword
      })

    } catch (error) {
        
    }
}

export const login = async (req, res) => {
    res.json({
        data: "You hit the login endpoint",
    });
}

export const logout = async (req, res) => {
    res.json({
        data: "You hit the logout endpoint",
    });
}