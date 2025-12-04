import { db } from '../services/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { MEDICINES, PHARMACIES } from '../constants';

export const seedDatabase = async () => {
    console.log("Starting database seed...");
    const batch = writeBatch(db);

    // Seed Medicines
    MEDICINES.forEach(medicine => {
        const ref = doc(db, 'medicines', medicine.id);
        batch.set(ref, medicine);
    });

    // Seed Pharmacies
    PHARMACIES.forEach(pharmacy => {
        const ref = doc(db, 'pharmacies', pharmacy.id);
        // Separate inventory from pharmacy details for cleaner structure, 
        // but for now keeping it simple as per types.ts
        batch.set(ref, pharmacy);
    });

    try {
        await batch.commit();
        console.log("Database seeded successfully!");
        alert("Database seeded successfully!");
    } catch (error: any) {
        console.error("Error seeding database:", error);
        alert("Error seeding database: " + (error.message || error));
    }
};
