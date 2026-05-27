"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegoPart = exports.LegoPartType = void 0;
const mongoose_1 = require("mongoose");
var LegoPartType;
(function (LegoPartType) {
    LegoPartType["HEAD"] = "head";
    LegoPartType["TORSO"] = "torso";
    LegoPartType["LEGS"] = "legs";
    LegoPartType["ACCESSORY"] = "accessory";
})(LegoPartType || (exports.LegoPartType = LegoPartType = {}));
const LegoPartSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: Object.values(LegoPartType)
    },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.LegoPart = (0, mongoose_1.model)('LegoPart', LegoPartSchema);
