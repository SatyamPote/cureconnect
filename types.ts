export interface Coordinate {
  latitude: number;
  longitude: number;
}

export enum StockStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Supply',
  OUT_OF_STOCK = 'Out of Stock'
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  description: string;
  price: number;
  requiresPrescription: boolean;
  image?: string;
  isCritical?: boolean;
}

export interface PharmacyInventory {
  medicineId: string;
  quantity: number;
  lastUpdated: string; // ISO string
  expiryDate?: string; // ISO string
}

export interface Pharmacy {
  id: string;
  name: string;
  type: 'Hub' | 'Local Store';
  address: string;
  location: Coordinate;
  inventory: PharmacyInventory[];
  phone: string;
  rating: number;
}

export interface CartItem extends Medicine {
  quantity: number;
  pharmacyId: string;
  distance: number; // in km
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  role: 'user' | 'partner';
  hasSeenTour?: boolean;
}