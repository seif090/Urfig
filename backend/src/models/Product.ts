import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string; // e.g., 'Marvel', 'Anime', 'Custom'
  price: number;
  imageUrl: string;
  stock: number;
  isReadyMade: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  isReadyMade: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = model<IProduct>('Product', ProductSchema);
迫