import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5000/api/promo';

  async validateCode(code: string) {
    return firstValueFrom(this.http.post<any>(`${this.API_URL}/validate`, { code }));
  }
}
