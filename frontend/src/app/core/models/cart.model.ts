import { SelectedLegoPart } from "./customizer.model";

export interface CartItem {
  id: string; // Unique ID for the cart entry (UUID recommended)
  type: 'ready-made' | 'custom';
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  customConfig?: {
    headId: string;
    torsoId: string;
    legsId: string;
    accessoryId?: string;
    customText?: string;
    partsMetadata: {
      head: SelectedLegoPart | null;
      torso: SelectedLegoPart | null;
      legs: SelectedLegoPart | null;
      accessory: SelectedLegoPart | null;
    }
  };
}
