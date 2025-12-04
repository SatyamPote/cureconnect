import { MEDICINES, PHARMACIES } from '../constants';
import { Coordinate, SearchResult, StockStatus } from '../types';

// Haversine formula to calculate distance in KM
const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return parseFloat(d.toFixed(2));
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const searchMedicines = (
  query: string, 
  userLocation: Coordinate | null, 
  filterType?: 'Hub' | 'Local Store'
): SearchResult[] => {
  const normalizedQuery = query.toLowerCase();
  
  // 1. Find matching medicines
  const matchingMedicines = MEDICINES.filter(m => 
    m.name.toLowerCase().includes(normalizedQuery) || 
    m.genericName.toLowerCase().includes(normalizedQuery) ||
    m.category.toLowerCase().includes(normalizedQuery)
  );

  const results: SearchResult[] = [];

  // 2. Find pharmacies stocking these medicines
  matchingMedicines.forEach(medicine => {
    PHARMACIES.forEach(pharmacy => {
      // Filter by type if requested
      if (filterType && pharmacy.type !== filterType) return;

      const stock = pharmacy.inventory.find(i => i.medicineId === medicine.id);
      
      // We list it even if out of stock, so user knows who NORMALLY carries it
      if (stock) {
        const distance = userLocation ? calculateDistance(userLocation, pharmacy.location) : 0;
        results.push({
          pharmacy,
          medicine,
          stock,
          distance
        });
      }
    });
  });

  // 3. Sort by distance (if available) otherwise by stock quantity
  if (userLocation) {
    results.sort((a, b) => a.distance - b.distance);
  } else {
    results.sort((a, b) => b.stock.quantity - a.stock.quantity);
  }

  return results;
};

export const getStockStatus = (quantity: number): StockStatus => {
  if (quantity === 0) return StockStatus.OUT_OF_STOCK;
  if (quantity < 30) return StockStatus.LOW_STOCK;
  return StockStatus.IN_STOCK;
};
