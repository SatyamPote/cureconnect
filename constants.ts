import { Medicine, Pharmacy, StockStatus } from './types';

export const MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Dolo 650',
    genericName: 'Paracetamol',
    category: 'Analgesic',
    description: 'Used to treat fever and mild to moderate pain.',
    price: 30,
    requiresPrescription: false,
  },
  {
    id: 'm2',
    name: 'Augmentin 625',
    genericName: 'Amoxicillin + Clavulanic Acid',
    category: 'Antibiotic',
    description: 'Used to treat bacterial infections.',
    price: 200,
    requiresPrescription: true,
  },
  {
    id: 'm3',
    name: 'Cetrizine',
    genericName: 'Cetirizine Hydrochloride',
    category: 'Antihistamine',
    description: 'Relieves allergy symptoms like runny nose and sneezing.',
    price: 18,
    requiresPrescription: false,
  },
  {
    id: 'm4',
    name: 'Glycomet 500',
    genericName: 'Metformin',
    category: 'Antidiabetic',
    description: 'Used for the treatment of type 2 diabetes.',
    price: 45,
    requiresPrescription: true,
  },
  {
    id: 'm5',
    name: 'Pan D',
    genericName: 'Pantoprazole + Domperidone',
    category: 'Antacid',
    description: 'Treats acidity and heartburn.',
    price: 110,
    requiresPrescription: true,
  },
  {
    id: 'm6',
    name: 'Shelcal 500',
    genericName: 'Calcium + Vitamin D3',
    category: 'Supplement',
    description: 'Calcium supplement for bone health.',
    price: 130,
    requiresPrescription: false,
  }
];

// Centered around Bangalore roughly
export const PHARMACIES: Pharmacy[] = [
  {
    id: 'p1',
    name: 'Apollo Pharmacy Hub',
    type: 'Hub',
    address: 'Indiranagar, Bangalore',
    location: { latitude: 12.9716, longitude: 77.6412 },
    phone: '+91 80 1234 5678',
    rating: 4.8,
    inventory: [
      { medicineId: 'm1', quantity: 500, lastUpdated: new Date().toISOString() },
      { medicineId: 'm2', quantity: 120, lastUpdated: new Date().toISOString() },
      { medicineId: 'm3', quantity: 300, lastUpdated: new Date().toISOString() },
      { medicineId: 'm4', quantity: 0, lastUpdated: new Date(Date.now() - 86400000).toISOString() }, // Out of stock
    ]
  },
  {
    id: 'p2',
    name: 'MedPlus Koramangala',
    type: 'Local Store',
    address: 'Koramangala 5th Block, Bangalore',
    location: { latitude: 12.9352, longitude: 77.6245 },
    phone: '+91 80 8765 4321',
    rating: 4.2,
    inventory: [
      { medicineId: 'm1', quantity: 20, lastUpdated: new Date().toISOString() }, // Low stock
      { medicineId: 'm4', quantity: 50, lastUpdated: new Date().toISOString() },
      { medicineId: 'm5', quantity: 15, lastUpdated: new Date().toISOString() },
      { medicineId: 'm6', quantity: 100, lastUpdated: new Date().toISOString() },
    ]
  },
  {
    id: 'p3',
    name: 'Wellness Forever',
    type: 'Hub',
    address: 'MG Road, Bangalore',
    location: { latitude: 12.9756, longitude: 77.6097 },
    phone: '+91 80 1122 3344',
    rating: 4.5,
    inventory: [
      { medicineId: 'm2', quantity: 5, lastUpdated: new Date().toISOString() },
      { medicineId: 'm3', quantity: 200, lastUpdated: new Date().toISOString() },
      { medicineId: 'm5', quantity: 30, lastUpdated: new Date().toISOString() },
    ]
  },
  {
    id: 'p4',
    name: 'Local Chemist',
    type: 'Local Store',
    address: 'Jayanagar 4th Block, Bangalore',
    location: { latitude: 12.9250, longitude: 77.5938 },
    phone: '+91 80 9988 7766',
    rating: 3.9,
    inventory: [
      { medicineId: 'm1', quantity: 100, lastUpdated: new Date().toISOString() },
      { medicineId: 'm2', quantity: 0, lastUpdated: new Date().toISOString() },
    ]
  }
];
