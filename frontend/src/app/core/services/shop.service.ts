import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5000/api/products';

  async getProducts(search: string = '', category: string = '') {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (category) params = params.set('category', category);

    return firstValueFrom(this.http.get<any[]>(this.API_URL, { params }));
  }

  async getCategories() {
    return firstValueFrom(this.http.get<string[]>(`${this.API_URL}/categories`));
  }
}
迫