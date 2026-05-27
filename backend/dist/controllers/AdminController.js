"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const LegoPart_1 = require("../models/LegoPart");
const Product_1 = require("../models/Product");
class AdminController {
    // --- Lego Parts Management ---
    static async addLegoPart(req, res) {
        try {
            const { name, type, price } = req.body;
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: 'Image is required' });
            }
            const imageUrl = `/uploads/lego-parts/${file.filename}`;
            const newPart = new LegoPart_1.LegoPart({
                name,
                type,
                price: parseFloat(price),
                imageUrl
            });
            await newPart.save();
            res.status(201).json(newPart);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    // --- Product Management ---
    static async createProduct(req, res) {
        try {
            const { name, description, category, price, stock } = req.body;
            const file = req.file;
            if (!file)
                return res.status(400).json({ message: 'Product image is required' });
            const imageUrl = `/uploads/lego-parts/${file.filename}`; // Reuse same upload folder for simplicity or create new
            const product = new Product_1.Product({
                name,
                description,
                category,
                price: parseFloat(price),
                stock: parseInt(stock),
                imageUrl,
                isReadyMade: true
            });
            await product.save();
            res.status(201).json(product);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, category, price, stock } = req.body;
            const file = req.file;
            const updateData = {
                name,
                description,
                category,
                price: parseFloat(price),
                stock: parseInt(stock)
            };
            if (file) {
                updateData.imageUrl = `/uploads/lego-parts/${file.filename}`;
            }
            const product = await Product_1.Product.findByIdAndUpdate(id, updateData, { new: true });
            if (!product)
                return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product_1.Product.findByIdAndDelete(id);
            if (!product)
                return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getLowStockProducts(req, res) {
        try {
            const threshold = 5; // Alert if stock is below 5
            const products = await Product_1.Product.find({
                isReadyMade: true,
                stock: { $lt: threshold }
            });
            res.json(products);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getPartStats(req, res) {
        try {
            const stats = await LegoPart_1.LegoPart.aggregate([
                { $group: { _id: '$type', count: { $sum: 1 } } }
            ]);
            res.json(stats);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.AdminController = AdminController;
