"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
class UserController {
    static async saveDesign(req, res) {
        try {
            const { name, headId, torsoId, legsId, accessoryId } = req.body;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            await User_1.User.findByIdAndUpdate(userId, {
                $push: {
                    savedDesigns: {
                        name,
                        head: headId,
                        torso: torsoId,
                        legs: legsId,
                        accessory: accessoryId
                    }
                }
            });
            res.status(200).json({ message: 'Design saved successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error saving design', error: error.message });
        }
    }
    static async getSavedDesigns(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            const user = await User_1.User.findById(userId)
                .populate('savedDesigns.head')
                .populate('savedDesigns.torso')
                .populate('savedDesigns.legs')
                .populate('savedDesigns.accessory');
            res.status(200).json(user?.savedDesigns || []);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching designs', error: error.message });
        }
    }
    static async toggleWishlist(req, res) {
        try {
            const { productId } = req.body;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            const user = await User_1.User.findById(userId);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            const index = user.wishlist.indexOf(productId);
            if (index > -1) {
                user.wishlist.splice(index, 1);
            }
            else {
                user.wishlist.push(productId);
            }
            await user.save();
            res.status(200).json({ wishlist: user.wishlist });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating wishlist', error: error.message });
        }
    }
    static async getWishlist(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'Unauthorized' });
            const user = await User_1.User.findById(userId).populate('wishlist');
            res.status(200).json(user?.wishlist || []);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
        }
    }
}
exports.UserController = UserController;
