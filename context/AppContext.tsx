import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Coordinate, CartItem, User } from '../types';
import { auth, db, onAuthStateChanged, signOut as firebaseSignOut } from '../services/firebase';
import { doc, setDoc, onSnapshot, getDoc, updateDoc, increment } from 'firebase/firestore';

interface AppContextType {
  userLocation: Coordinate | null;
  locationError: string | null;
  cart: CartItem[];
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (medicineId: string, pharmacyId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  user: User | null;
  logout: () => void;
  isLoadingLocation: boolean;
  isLoadingAuth: boolean;
  addPoints: (amount: number) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Initial Location Fetch
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to Bangalore Center for demo purposes
          setUserLocation({ latitude: 12.9716, longitude: 77.5946 });
          setLocationError("Could not detect location. Using default.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setIsLoadingLocation(false);
    }
  }, []);

  // Auth Listener & Cart Sync
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Setup Firestore listener for this user's data (cart + points)
        const userDocRef = doc(db, 'users', firebaseUser.uid);

        unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();

            // Update User State
            const appUser: User = {
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              points: data.points || 0,
              role: data.role || 'user',
              hasSeenTour: data.hasSeenTour || false
            };
            setUser(appUser);

            if (data.cart) {
              setCart(data.cart);
            }
          } else {
            // Create the document if it doesn't exist (e.g., first login)
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              points: 0,
              role: 'user',
              hasSeenTour: false
            };
            setDoc(userDocRef, { ...newUser, cart: [] }, { merge: true });
            setUser(newUser);
          }
        });

        setIsLoadingAuth(false);
      } else {
        setUser(null);
        setCart([]); // Clear cart on logout
        setIsLoadingAuth(false);
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot();
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
    };
  }, []);

  const addToCart = async (item: CartItem) => {
    // Optimistic calculation for new state
    let newCart = [...cart];
    const existingIndex = newCart.findIndex(i => i.id === item.id && i.pharmacyId === item.pharmacyId);

    if (existingIndex >= 0) {
      const existingItem = newCart[existingIndex];
      newCart[existingIndex] = { ...existingItem, quantity: existingItem.quantity + item.quantity };
    } else {
      newCart.push(item);
    }

    if (user) {
      // If logged in, write to Firestore (Snapshot listener will update UI)
      try {
        await setDoc(doc(db, 'users', user.id), { cart: newCart }, { merge: true });
      } catch (e) {
        console.error("Error updating cart in Firestore", e);
      }
    } else {
      // If guest, just update local state
      setCart(newCart);
    }
  };

  const removeFromCart = async (medicineId: string, pharmacyId: string) => {
    const newCart = cart.filter(i => !(i.id === medicineId && i.pharmacyId === pharmacyId));

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.id), { cart: newCart }, { merge: true });
      } catch (e) {
        console.error("Error removing from cart in Firestore", e);
      }
    } else {
      setCart(newCart);
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.id), { cart: [] }, { merge: true });
      } catch (e) {
        console.error("Error clearing cart", e);
      }
    } else {
      setCart([]);
    }
  };

  const addPoints = async (amount: number) => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.id);
        await updateDoc(userDocRef, {
          points: increment(amount)
        });
      } catch (e) {
        console.error("Error adding points", e);
      }
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AppContext.Provider value={{
      userLocation,
      locationError,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      user,
      logout,
      isLoadingLocation,
      isLoadingAuth,
      addPoints
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};