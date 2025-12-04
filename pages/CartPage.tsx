import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ArrowRight, CheckCircle } from 'lucide-react';
import { PHARMACIES } from '../constants';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, clearCart, user } = useApp();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const [checkedOut, setCheckedOut] = React.useState(false);

  // Group items by pharmacy
  const groupedItems = cart.reduce((acc, item) => {
    if (!acc[item.pharmacyId]) acc[item.pharmacyId] = [];
    acc[item.pharmacyId].push(item);
    return acc;
  }, {} as Record<string, typeof cart>);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCheckedOut(true);
    setTimeout(() => {
      clearCart();
      setCheckedOut(false);
      alert("Order reserved successfully! Please pick up from the pharmacy within 24 hours.");
    }, 2000);
  };

  if (cart.length === 0 && !checkedOut) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <ArrowRight size={32} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-slate-500 mt-2">Search for medicines to reserve them.</p>
      </div>
    );
  }

  if (checkedOut) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="bg-green-100 p-6 rounded-full mb-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Reservation Confirmed!</h2>
        <p className="text-slate-600 mt-2 max-w-md">
          Your medicines have been reserved. We've sent the details to your phone.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Your Reservations</h1>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([pharmacyId, items]) => {
          const pharmacy = PHARMACIES.find(p => p.id === pharmacyId);
          return (
            <div key={pharmacyId} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800">{pharmacy?.name || 'Unknown Pharmacy'}</h3>
                <p className="text-xs text-slate-500">{pharmacy?.address}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.name}</h4>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <span className="font-bold text-slate-800">₹{item.price * item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id, item.pharmacyId)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Estimate</p>
            <p className="text-2xl font-bold text-slate-900">₹{total}</p>
          </div>
          <button 
            onClick={handleCheckout}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-teal-600/20 transition-all transform active:scale-95"
          >
            {user ? 'Confirm Reservation' : 'Login to Reserve'}
          </button>
        </div>
      </div>
    </div>
  );
}