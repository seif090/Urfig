import { LegoPart, ILegoPart, LegoPartType } from '../models/LegoPart.js';

export class CustomizerService {
  /**
   * BASE_PRICE covers the keychain ring, chain, and assembly labor.
   */
  private static readonly BASE_PRICE = 4.99;

  /**
   * Fetch all active parts grouped by their type (Head, Torso, etc.)
   */
  static async getAllPartsGrouped() {
    const parts = await LegoPart.find({ isActive: true, stock: { $gt: 0 } });
    
    return {
      heads: parts.filter(p => p.type === LegoPartType.HEAD),
      torsos: parts.filter(p => p.type === LegoPartType.TORSO),
      legs: parts.filter(p => p.type === LegoPartType.LEGS),
      accessories: parts.filter(p => p.type === LegoPartType.ACCESSORY)
    };
  }

  /**
   * Validates a configuration and calculates the total dynamic price.
   * This ensures the price is calculated server-side to prevent tampering.
   */
  static async calculateConfigurationPrice(partIds: string[]): Promise<number> {
    const parts = await LegoPart.find({ _id: { $in: partIds } });
    
    const partsTotal = parts.reduce((sum, part) => sum + part.price, 0);
    
    return parseFloat((this.BASE_PRICE + partsTotal).toFixed(2));
  }

  /**
   * Verify if a specific configuration is valid (has all required parts)
   */
  static async validateConfiguration(headId: string, torsoId: string, legsId: string) {
    const requiredParts = await LegoPart.find({
      _id: { $in: [headId, torsoId, legsId] },
      isActive: true,
      stock: { $gt: 0 }
    });

    // Check if we found all 3 required types
    const foundTypes = new Set(requiredParts.map(p => p.type));
    return foundTypes.has(LegoPartType.HEAD) && 
           foundTypes.has(LegoPartType.TORSO) && 
           foundTypes.has(LegoPartType.LEGS);
  }
}
迫