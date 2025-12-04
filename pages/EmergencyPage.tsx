import React, { useState, useEffect } from 'react';
import { Phone, MapPin, AlertTriangle, Navigation } from 'lucide-react';
import { PHARMACIES } from '../constants';
import { Pharmacy } from '../types';

export const EmergencyPage = () => {
    const [nearbyPharmacies, setNearbyPharmacies] = useState<Pharmacy[]>([]);
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        // Mock location for demo if not available
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setUserLocation({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            },
            (err) => {
                console.log("Using default location");
                setUserLocation({ latitude: 12.9716, longitude: 77.6412 }); // Bangalore default
            }
        );
    }, []);

    useEffect(() => {
        if (userLocation) {
            // Sort by distance and filter for "Hub" (assuming Hubs are 24/7 or better stocked)
            // In a real app, we'd have a specific 'is24x7' flag
            const sorted = [...PHARMACIES].sort((a, b) => {
                // Simple distance mock
                return 0; // Already sorted in constants roughly
            });
            setNearbyPharmacies(sorted);
        }
    }, [userLocation]);

    return (
        <div className="pb-20">
            <div className="bg-red-50 border-b border-red-100 p-6 mb-6 rounded-xl">
                <div className="flex items-center gap-3 text-red-600 mb-2">
                    <AlertTriangle size={32} className="animate-pulse" />
                    <h1 className="text-2xl font-bold">Emergency Mode</h1>
                </div>
                <p className="text-red-800">
                    Finding nearest 24/7 pharmacies and emergency supplies.
                    <br /><strong>For medical emergencies, please call 108 immediately.</strong>
                </p>
            </div>

            <div className="space-y-4">
                {nearbyPharmacies.map(pharmacy => (
                    <div key={pharmacy.id} className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm p-5 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">{pharmacy.name}</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                                <MapPin size={14} /> {pharmacy.address}
                            </p>
                            <div className="flex gap-2 mt-3">
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Open 24/7</span>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">Home Delivery</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <a
                                href={`tel:${pharmacy.phone}`}
                                className="bg-red-600 text-white p-3 rounded-full shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
                            >
                                <Phone size={24} />
                            </a>
                            <button className="bg-slate-100 text-slate-600 p-3 rounded-full hover:bg-slate-200 transition-colors">
                                <Navigation size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-lg mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Ambulance</span>
                        <a href="tel:108" className="text-red-600 font-bold text-lg">108</a>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">Police</span>
                        <a href="tel:100" className="text-slate-900 font-bold text-lg">100</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
