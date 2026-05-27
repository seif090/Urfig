import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomKeychainState, INITIAL_CUSTOMIZER_STATE, SelectedLegoPart } from '../models/customizer.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomizerService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:5000/api/customizer';

  // State using Angular Signals
  private state = signal<CustomKeychainState>(INITIAL_CUSTOMIZER_STATE);

  // Read-only signals for the UI to consume
  readonly currentConfiguration = computed(() => this.state());
  readonly totalPrice = computed(() => this.state().totalPrice);
  readonly isComplete = computed(() => {
    const s = this.state();
    return !!(s.head && s.torso && s.legs);
  });

  /**
   * Fetch all available parts from the backend
   */
  async getAvailableParts() {
    return firstValueFrom(this.http.get<{
      heads: SelectedLegoPart[],
      torsos: SelectedLegoPart[],
      legs: SelectedLegoPart[],
      accessories: SelectedLegoPart[]
    }>(`${this.API_URL}/parts`));
  }

  /**
   * Update a specific part in the customization state
   */
  selectPart(part: SelectedLegoPart) {
    this.state.update(s => {
      const newState = { ...s, [part.type]: part };
      return {
        ...newState,
        totalPrice: this.calculateLocalPrice(newState)
      };
    });
  }

  /**
   * Update custom text engraving
   */
  setCustomText(text: string) {
    this.state.update(s => ({ ...s, customText: text }));
  }

  /**
   * Reset the customizer to initial state
   */
  reset() {
    this.state.set(INITIAL_CUSTOMIZER_STATE);
  }

  /**
   * Local price calculation for immediate UI feedback.
   * Real orders will re-validate this price on the server.
   */
  private calculateLocalPrice(s: CustomKeychainState): number {
    const BASE_PRICE = 4.99;
    const parts = [s.head, s.torso, s.legs, s.accessory];
    const partsTotal = parts.reduce((sum, p) => sum + (p?.price || 0), 0);
    return parseFloat((BASE_PRICE + partsTotal).toFixed(2));
  }

  /**
   * Sync with server to get the official price (optional validation step)
   */
  async refreshOfficialPrice() {
    const s = this.state();
    const partIds = [s.head?.id, s.torso?.id, s.legs?.id, s.accessory?.id].filter(id => !!id);
    
    if (partIds.length === 0) return;

    try {
      const res = await firstValueFrom(this.http.post<{ totalPrice: number }>(
        `${this.API_URL}/calculate-price`, 
        { partIds }
      ));
      
      this.state.update(curr => ({ ...curr, totalPrice: res.totalPrice }));
    } catch (error) {
      console.error('Failed to sync official price', error);
    }
  }
}
迫