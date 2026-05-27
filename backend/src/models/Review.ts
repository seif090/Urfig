import { Schema, model, Document, Types } from 'mongoose';

export interface IReview extends Document {
  product: Types.ObjectId;
  user: Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

export const Review = model<IReview>('Review', ReviewSchema);
