import React, { useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useApp } from '../context/AppContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const TourGuide = () => {
    const { user } = useApp();

    useEffect(() => {
        // Only show tour if user is logged in, hasn't seen it, and is a regular user
        if (user && !user.hasSeenTour && user.role === 'user') {
            const driverObj = driver({
                showProgress: true,
                steps: [
                    {
                        element: '#search-bar',
                        popover: {
                            title: 'Find Medicines',
                            description: 'Search for medicines by name or generic name. We will find the nearest pharmacy for you.'
                        }
                    },
                    {
                        element: '#upload-rx-link',
                        popover: {
                            title: 'Upload Prescription',
                            description: 'Have a prescription? Upload it here and we will handle the rest.'
                        }
                    },
                    {
                        element: '#sos-button',
                        popover: {
                            title: 'Emergency SOS',
                            description: 'In case of emergency, use this button to quickly alert nearby services.'
                        }
                    },
                    {
                        element: '#cart-link',
                        popover: {
                            title: 'Your Cart',
                            description: 'View your selected medicines and proceed to checkout.'
                        }
                    },
                    {
                        element: '#points-badge',
                        popover: {
                            title: 'Earn Rewards',
                            description: 'Earn points with every purchase and redeem them for discounts!'
                        }
                    },
                    {
                        element: '#teleconsult-link',
                        popover: {
                            title: 'Teleconsultation',
                            description: 'Connect with doctors instantly for a consultation.'
                        }
                    }
                ],
                onDestroyStarted: () => {
                    // Mark tour as seen when finished or skipped
                    if (user && user.id) {
                        updateDoc(doc(db, 'users', user.id), {
                            hasSeenTour: true
                        }).catch(err => console.error("Error updating tour status:", err));

                        // Force local update if needed, but AppContext listener should handle it
                    }
                    driverObj.destroy();
                },
            });

            driverObj.drive();
        }
    }, [user]);

    return null; // This component doesn't render anything visible itself
};
