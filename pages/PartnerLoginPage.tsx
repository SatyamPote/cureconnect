import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from '../services/firebase';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useApp } from '../context/AppContext';

export const PartnerLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useApp();

    // Redirect when user role is confirmed as partner
    useEffect(() => {
        if (user?.role === 'partner') {
            navigate('/pharmacy-dashboard');
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Navigation handled by useEffect
        } catch (err: any) {
            setError("Invalid email or password.");
            setLoading(false);
            console.error(err);
        }
    };

    // Dev only: Quick register as partner
    const handleDevPartnerRegister = async () => {
        setLoading(true);
        try {
            // Create a new partner account or promote current one
            const userCredential = await signInWithEmailAndPassword(auth, email, password).catch(async () => {
                // If login fails, try creating
                const { createUserWithEmailAndPassword } = await import('firebase/auth');
                return createUserWithEmailAndPassword(auth, email, password);
            });

            const firebaseUser = userCredential.user;
            await setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email,
                name: 'Pharmacy Partner',
                role: 'partner',
                points: 0
            }, { merge: true });

            // Navigation handled by useEffect
        } catch (err: any) {
            setError("Dev Register Failed: " + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                        <Store size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Partner Login</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Manage your pharmacy inventory and orders
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-t-xl relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Partner Email"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-b-xl relative block w-full px-10 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 transition-colors"
                        >
                            {loading ? 'Signing in...' : 'Sign in to Dashboard'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 mb-2">Development Only:</p>
                    <button
                        onClick={handleDevPartnerRegister}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Register/Login as New Partner (Dev)
                    </button>
                </div>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-sm text-slate-500 hover:text-teal-600 flex items-center justify-center gap-1">
                        Not a partner? User Login <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};
