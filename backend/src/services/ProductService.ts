import { Product, IProduct } from '../models/Product';

export class ProductService {
  /**
   * Fetch products with optional search and category filters
   */
  static async getProducts(query: string = '', category: string = ''): Promise<IProduct[]> {
    const filter: any = { isReadyMade: true };

    if (query) {
      filter.name = { $regex: query, $options: 'i' };
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    return await Product.find(filter).sort({ createdAt: -1 });
  }

  static async getCategories(): Promise<string[]> {
    return await Product.distinct('category', { isReadyMade: true });
  }
}

