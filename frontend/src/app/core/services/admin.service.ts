import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/admin';

  uploadLegoPart(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/lego-parts`, formData);
  }

  // Ready-made Product Management
  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, formData);
  }

  updateProduct(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getLowStockProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/low-stock`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}
迫