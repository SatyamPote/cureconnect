import { db } from './firebase';
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { Medicine, Pharmacy, SearchResult, Coordinate } from '../types';

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

export const searchMedicinesRealTime = async (
    queryText: string,
    userLocation: Coordinate | null,
    filterType?: 'Hub' | 'Local Store'
): Promise<SearchResult[]> => {
    const normalizedQuery = queryText.toLowerCase();
    const results: SearchResult[] = [];

    try {
        // 1. Get all medicines (In a real app, use Algolia/Elasticsearch for text search)
        // For this demo, we fetch all and filter client-side or use simple Firestore queries
        const medicinesRef = collection(db, 'medicines');
        const medicinesSnap = await getDocs(medicinesRef);

        const matchingMedicines: Medicine[] = [];
        medicinesSnap.forEach(doc => {
            const data = doc.data() as Medicine;
            if (
                data.name.toLowerCase().includes(normalizedQuery) ||
                data.genericName.toLowerCase().includes(normalizedQuery) ||
                data.category.toLowerCase().includes(normalizedQuery)
            ) {
                matchingMedicines.push(data);
            }
        });

        if (matchingMedicines.length === 0) return [];

        // 2. Get all pharmacies (Again, optimize for production)
        const pharmaciesRef = collection(db, 'pharmacies');
        const pharmaciesSnap = await getDocs(pharmaciesRef);

        const pharmacies: Pharmacy[] = [];
        pharmaciesSnap.forEach(doc => {
            const data = doc.data() as Pharmacy;
            if (!filterType || data.type === filterType) {
                pharmacies.push(data);
            }
        });

        // 3. Match medicines to pharmacies
        matchingMedicines.forEach(medicine => {
            pharmacies.forEach(pharmacy => {
                const stock = pharmacy.inventory.find(i => i.medicineId === medicine.id);

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

        // 4. Sort
        if (userLocation) {
            results.sort((a, b) => a.distance - b.distance);
        } else {
            results.sort((a, b) => b.stock.quantity - a.stock.quantity);
        }

    } catch (error) {
        console.error("Error searching medicines:", error);
    }

    return results;
};

// Listen to real-time updates for a specific pharmacy's inventory
export const subscribeToPharmacyInventory = (pharmacyId: string, callback: (inventory: any[]) => void) => {
    const unsub = onSnapshot(doc(db, 'pharmacies', pharmacyId), (doc) => {
        if (doc.exists()) {
            callback(doc.data().inventory);
        }
    });
    return unsub;
};
