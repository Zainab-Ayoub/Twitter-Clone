import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        
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