"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
class AuthService {
    static JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-urfig';
    static JWT_EXPIRES_IN = '7d';
    static async register(userData) {
        const existingUser = await User_1.User.findOne({ email: userData.email });
        if (existingUser)
            throw new Error('Email already in use');
        const user = new User_1.User(userData);
        await user.save();
        return this.generateTokenResponse(user);
    }
    static async login(email, password) {
        const user = await User_1.User.findOne({ email });
        if (!user)
            throw new Error('Invalid credentials');
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            throw new Error('Invalid credentials');
        return this.generateTokenResponse(user);
    }
    static generateTokenResponse(user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}
exports.AuthService = AuthService;
