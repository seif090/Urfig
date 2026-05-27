"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    savedDesigns: [{
            name: String,
            head: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
            torso: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
            legs: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
            accessory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
            createdAt: { type: Date, default: Date.now }
        }],
    wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });
// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
});
UserSchema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password || '');
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
