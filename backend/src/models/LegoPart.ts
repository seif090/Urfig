import { Schema, model, Document } from 'mongoose';

export enum LegoPartType {
  HEAD = 'head',
  TORSO = 'torso',
  LEGS = 'legs',
  ACCESSORY = 'accessory'
}

export interface ILegoPart extends Document {
  name: string;
  type: LegoPartType;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
}

const LegoPartSchema = new Schema<ILegoPart>({
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

export const LegoPart = model<ILegoPart>('LegoPart', LegoPartSchema);
