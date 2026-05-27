import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5000/api/reviews';

  async getReviews(productId: string) {
    return firstValueFrom(this.http.get<any[]>(`${this.API_URL}/${productId}`));
  }

  async addReview(productId: string, rating: number, comment: string) {
    return firstValueFrom(this.http.post<any>(this.API_URL, { productId, rating, comment }));
  }
}
迫