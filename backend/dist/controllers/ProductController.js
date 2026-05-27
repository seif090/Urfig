"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
class ProductController {
    static async listProducts(req, res) {
        try {
            const { search, category } = req.query;
            const products = await ProductService_1.ProductService.getProducts(search, category);
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    }
    static async getCategories(req, res) {
        try {
            const categories = await ProductService_1.ProductService.getCategories();
            res.status(200).json(categories);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    }
}
exports.ProductController = ProductController;
