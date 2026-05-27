import { Request, Response } from 'express';
import { LegoPart } from '../models/LegoPart.js';
import { Product } from '../models/Product.js';
import fs from 'fs';
import path from 'path';

export class AdminController {
  // --- Lego Parts Management ---
  static async addLegoPart(req: Request, res: Response) {
    try {
      const { name, type, price } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Image is required' });
      }

      const imageUrl = `/uploads/lego-parts/${file.filename}`;

      const newPart = new LegoPart({
        name,
        type,
        price: parseFloat(price),
        imageUrl
      });

      await newPart.save();
      res.status(201).json(newPart);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // --- Product Management ---
  static async createProduct(req: Request, res: Response) {
    try {
      const { name, description, category, price, stock } = req.body;
      const file = req.file;

      if (!file) return res.status(400).json({ message: 'Product image is required' });

      const imageUrl = `/uploads/lego-parts/${file.filename}`; // Reuse same upload folder for simplicity or create new

      const product = new Product({
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
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, category, price, stock } = req.body;
      const file = req.file;

      const updateData: any = {
        name,
        description,
        category,
        price: parseFloat(price),
        stock: parseInt(stock)
      };

      if (file) {
        updateData.imageUrl = `/uploads/lego-parts/${file.filename}`;
      }

      const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });

      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      
      res.json({ message: 'Product deleted' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getPartStats(req: Request, res: Response) {
    try {
      const stats = await LegoPart.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
迫