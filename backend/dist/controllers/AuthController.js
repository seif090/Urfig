"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
class AuthController {
    static async register(req, res) {
        try {
            const result = await AuthService_1.AuthService.register(req.body);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await AuthService_1.AuthService.login(email, password);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
    static async getMe(req, res) {
        // This would be called after auth middleware
        res.status(200).json(req.user);
    }
}
exports.AuthController = AuthController;
