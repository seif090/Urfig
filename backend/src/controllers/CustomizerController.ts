import { Request, Response } from 'express';
import { CustomizerService } from '../services/CustomizerService';

export class CustomizerController {
  static async getAvailableParts(req: Request, res: Response) {
    try {
      const groupedParts = await CustomizerService.getAllPartsGrouped();
      res.status(200).json(groupedParts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching lego parts', error });
    }
  }

  static async getPrice(req: Request, res: Response) {
    try {
      const { partIds } = req.body;
      if (!Array.isArray(partIds)) {
        return res.status(400).json({ message: 'partIds must be an array' });
      }
      
      const totalPrice = await CustomizerService.calculateConfigurationPrice(partIds);
      res.status(200).json({ totalPrice });
    } catch (error) {
      res.status(500).json({ message: 'Error calculating price', error });
    }
  }
}

