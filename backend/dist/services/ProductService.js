"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("../models/Product");
class ProductService {
    /**
     * Fetch products with optional search and category filters
     */
    static async getProducts(query = '', category = '') {
        const filter = { isReadyMade: true };
        if (query) {
            filter.name = { $regex: query, $options: 'i' };
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        return await Product_1.Product.find(filter).sort({ createdAt: -1 });
    }
    static async getCategories() {
        return await Product_1.Product.distinct('category', { isReadyMade: true });
    }
}
exports.ProductService = ProductService;
