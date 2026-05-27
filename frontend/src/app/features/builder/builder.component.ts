import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomizerService } from '../../core/services/customizer.service';
import { CartService } from '../../core/services/cart.service';
import { SelectedLegoPart } from '../../core/models/customizer.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent implements OnInit {
  private customizerService = inject(CustomizerService);
  private cartService = inject(CartService);

  // Available parts fetched from the backend
  parts = signal<{
    heads: SelectedLegoPart[],
    torsos: SelectedLegoPart[],
    legs: SelectedLegoPart[],
    accessories: SelectedLegoPart[]
  } | null>(null);

  // Active tab in the selection menu
  activeTab = signal<'head' | 'torso' | 'legs' | 'accessory'>('head');

  // Expose signals from the service to the template
  currentConfig = this.customizerService.currentConfiguration;
  totalPrice = this.customizerService.totalPrice;
  isComplete = this.customizerService.isComplete;

  async ngOnInit() {
    try {
      const data = await this.customizerService.getAvailableParts();
      this.parts.set(data);
    } catch (error) {
      console.error('Failed to load parts', error);
    }
  }

  selectTab(tab: 'head' | 'torso' | 'legs' | 'accessory') {
    this.activeTab.set(tab);
  }

  onPartSelect(part: SelectedLegoPart) {
    this.customizerService.selectPart(part);
  }

  onTextChange(event: Event) {
    const text = (event.target as HTMLInputElement).value;
    this.customizerService.setCustomText(text);
  }

  addToCart() {
    if (this.isComplete()) {
      this.cartService.addCustomKeychain(this.currentConfig());
      alert('Custom keychain added to cart!');
      this.customizerService.reset();
    }
  }
}
