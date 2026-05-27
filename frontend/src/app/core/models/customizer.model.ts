/**
 * Interface representing the live state of a keychain being customized
 */
export interface CustomKeychainState {
  head: SelectedLegoPart | null;
  torso: SelectedLegoPart | null;
  legs: SelectedLegoPart | null;
  accessory: SelectedLegoPart | null;
  customText?: string;
  totalPrice: number;
}

export interface SelectedLegoPart {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  type: 'head' | 'torso' | 'legs' | 'accessory';
}

/**
 * Initial empty state for the customizer
 */
export const INITIAL_CUSTOMIZER_STATE: CustomKeychainState = {
  head: null,
  torso: null,
  legs: null,
  accessory: null,
  customText: '',
  totalPrice: 4.99 // Base price for a keychain ring + assembly
};
迫