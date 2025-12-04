import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Bell, Plus, Edit2 } from 'lucide-react';
import { PHARMACIES, MEDICINES } from '../constants';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const PharmacyDashboard = () => {
    // Mock logged in pharmacy
    const pharmacy = PHARMACIES[0];
    const [inventory, setInventory] = useState(pharmacy.inventory);
    const { user, isLoadingAuth } = useApp();
    const navigate = useNavigate();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedMedicineId, setSelectedMedicineId] = useState('');
    const [newMedicineQty, setNewMedicineQty] = useState(10);
    const [newMedicineExpiry, setNewMedicineExpiry] = useState('');

    useEffect(() => {
        if (!isLoadingAuth) {
            if (!user) {
                navigate('/partner-login');
            } else if (user.role !== 'partner') {
                alert("Access Denied. This area is for Pharmacy Partners only.");
                navigate('/');
            }
        }
    }, [user, isLoadingAuth, navigate]);

    const handleUpdateStock = (medicineId: string, newQty: number) => {
        setInventory(prev => prev.map(item =>
            item.medicineId === medicineId ? { ...item, quantity: newQty, lastUpdated: new Date().toISOString() } : item
        ));
        alert("Stock updated successfully!");
    };

    const handleAddMedicine = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMedicineId || newMedicineQty <= 0) return;

        const newItem = {
            medicineId: selectedMedicineId,
            quantity: newMedicineQty,
            lastUpdated: new Date().toISOString(),
            expiryDate: newMedicineExpiry ? new Date(newMedicineExpiry).toISOString() : undefined
        };

        setInventory(prev => [newItem, ...prev]);
        setIsAddModalOpen(false);
        setSelectedMedicineId('');
        setNewMedicineQty(10);
        setNewMedicineExpiry('');
        alert("Medicine added to inventory!");
    };

    const availableMedicines = MEDICINES.filter(m => !inventory.some(i => i.medicineId === m.id));

    if (isLoadingAuth) return <div className="p-10 text-center">Loading...</div>;
    if (!user || user.role !== 'partner') return null;

    return (
        <div className="pb-20 relative">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Pharmacy Partner Dashboard</h1>
                    <p className="text-slate-500">{pharmacy.name} • {pharmacy.address}</p>
                </div>
                <div className="bg-teal-100 text-teal-800 p-2 rounded-full">
                    <Bell size={24} />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Total Orders</div>
                    <div className="text-2xl font-bold text-slate-800">124</div>
                    <div className="text-green-500 text-xs flex items-center gap-1 mt-1">
                        <TrendingUp size={12} /> +12% today
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Revenue</div>
                    <div className="text-2xl font-bold text-slate-800">₹45k</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Low Stock</div>
                    <div className="text-2xl font-bold text-amber-600">3</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1">Pending Pickups</div>
                    <div className="text-2xl font-bold text-indigo-600">8</div>
                </div>
            </div>

            {/* Inventory Management */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Package size={20} className="text-teal-600" /> Inventory Management
                    </h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-teal-700"
                    >
                        <Plus size={16} /> Add Medicine
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {inventory.map(item => {
                        const med = MEDICINES.find(m => m.id === item.medicineId);
                        if (!med) return null;

                        return (
                            <div key={item.medicineId} className="p-4 flex items-center justify-between hover:bg-slate-50">
                                <div>
                                    <h3 className="font-medium text-slate-900">{med.name}</h3>
                                    <p className="text-xs text-slate-500">{med.genericName}</p>
                                    {item.expiryDate && (
                                        <p className="text-[10px] text-slate-400 mt-1">Exp: {new Date(item.expiryDate).toLocaleDateString()}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-slate-700">Qty: {item.quantity}</div>
                                        <div className="text-[10px] text-slate-400">Last: {new Date(item.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newQty = prompt("Enter new quantity:", item.quantity.toString());
                                            if (newQty !== null) handleUpdateStock(item.medicineId, parseInt(newQty));
                                        }}
                                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Add Medicine Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Add New Medicine</h3>
                        <form onSubmit={handleAddMedicine} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Medicine</label>
                                <select
                                    value={selectedMedicineId}
                                    onChange={(e) => setSelectedMedicineId(e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    required
                                >
                                    <option value="">-- Choose Medicine --</option>
                                    {availableMedicines.map(med => (
                                        <option key={med.id} value={med.id}>
                                            {med.name} ({med.genericName})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={newMedicineQty}
                                    onChange={(e) => setNewMedicineQty(parseInt(e.target.value))}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    value={newMedicineExpiry}
                                    onChange={(e) => setNewMedicineExpiry(e.target.value)}
                                    className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium"
                                >
                                    Add Stock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
