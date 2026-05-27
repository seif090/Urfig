"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', AuthController_1.AuthController.register);
/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 */
router.post('/login', AuthController_1.AuthController.login);
exports.default = router;
