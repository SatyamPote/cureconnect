import React from 'react';
import { SearchResult } from '../types';
import { getStockStatus } from '../services/mockDatabase';
import { StockStatus } from '../types';
import { MapPin, Phone, ShoppingBag, AlertCircle, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  data: SearchResult;
  onAddToCart?: () => void;
  onFindAlternative?: () => void;
}

export const PharmacyCard: React.FC<Props> = ({ data, onAddToCart, onFindAlternative }) => {
  const { pharmacy, medicine, stock, distance } = data;
  const status = getStockStatus(stock.quantity);

  const getStatusColor = (s: StockStatus) => {
    switch (s) {
      case StockStatus.IN_STOCK: return 'bg-green-100 text-green-800 border-green-200';
      case StockStatus.LOW_STOCK: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case StockStatus.OUT_OF_STOCK: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{pharmacy.name}</h3>
          <div className="flex items-center text-slate-500 text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{distance} km away</span>
            <span className="mx-2">•</span>
            <span>{pharmacy.type}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      <div className="flex items-start justify-between bg-slate-50 p-3 rounded-lg">
        <div>
          <p className="font-medium text-slate-800">{medicine.name}</p>
          <p className="text-xs text-slate-500">{medicine.genericName}</p>
          {medicine.requiresPrescription && (
            <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-medium border border-amber-200">
              <FileText size={10} />
              <span>Rx Required</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-900">₹{medicine.price}</p>
          <p className="text-xs text-slate-500">{stock.quantity} units left</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {status !== StockStatus.OUT_OF_STOCK ? (
          <button 
            onClick={onAddToCart}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        ) : (
           <button 
            onClick={onFindAlternative}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <AlertCircle size={16} /> Find Alternative
          </button>
        )}
        <a href={`tel:${pharmacy.phone}`} className="p-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
          <Phone size={20} />
        </a>
      </div>
      
      <p className="text-[10px] text-slate-400 mt-2 text-right">
        Updated: {new Date(stock.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </p>
    </div>
  );
};