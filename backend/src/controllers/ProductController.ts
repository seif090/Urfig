import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService.js';

export class ProductController {
  static async listProducts(req: Request, res: Response) {
    try {
      const { search, category } = req.query;
      const products = await ProductService.getProducts(search as string, category as string);
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  }

  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await ProductService.getCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  }
}
迫