import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, HeartPulse, UserCircle, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { cart, user, logout } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <HeartPulse className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">CureConnect</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
             <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
               <div className="flex items-center gap-2">
                 <UserCircle size={24} className="text-teal-600"/>
                 <span className="hidden sm:block">{user.name}</span>
               </div>
               <button 
                 onClick={logout}
                 className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                 title="Sign Out"
               >
                 <LogOut size={18} />
               </button>
             </div>
          ) : (
            <Link 
              to="/login"
              className="text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};