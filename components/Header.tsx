import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, HeartPulse, UserCircle, LogOut, FileText, AlertTriangle, Store, Star, Clock, Video, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { seedDatabase } from '../services/seed';

export const Header = () => {
  const { cart, user, logout } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <HeartPulse className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">CureConnect</span>
          </Link>

          <Link id="sos-button" to="/emergency" className="hidden sm:flex bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold items-center gap-1 animate-pulse hover:bg-red-200 transition-colors">
            <AlertTriangle size={14} /> SOS
          </Link>

          {/* Dev Tool: Seed DB */}
          <button
            onClick={seedDatabase}
            className="hidden md:block text-[10px] bg-slate-100 text-slate-400 px-2 py-1 rounded hover:bg-slate-200"
            title="Seed Database (Dev Only)"
          >
            Seed DB
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/partner-login" className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors" title="Partner Dashboard">
            <Store size={18} />
          </Link>

          <Link to="/reminders" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors" title="Reminders">
            <Clock size={18} />
          </Link>

          <Link id="teleconsult-link" to="/teleconsult" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors" title="Teleconsultation">
            <Video size={18} />
          </Link>

          <Link id="upload-rx-link" to="/upload-prescription" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
            <FileText size={18} />
            <span>Upload Rx</span>
          </Link>
          <Link id="cart-link" to="/cart" className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              {/* Points Badge */}
              <div id="points-badge" className="hidden sm:flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold">
                <Star size={12} className="fill-amber-800" />
                {user.points} pts
              </div>

              <div className="flex items-center gap-2">
                <UserCircle size={24} className="text-teal-600" />
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-teal-600 transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="p-2 text-slate-600">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            {user && (
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <UserCircle size={20} className="text-teal-600" />
                <span className="font-medium text-slate-800">{user.name}</span>
                <span className="ml-auto bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={10} className="fill-amber-800" /> {user.points}
                </span>
              </div>
            )}

            <Link to="/upload-prescription" onClick={toggleMenu} className="flex items-center gap-3 text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-50">
              <FileText size={20} /> Upload Prescription
            </Link>
            <Link to="/reminders" onClick={toggleMenu} className="flex items-center gap-3 text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-50">
              <Clock size={20} /> Reminders
            </Link>
            <Link to="/teleconsult" onClick={toggleMenu} className="flex items-center gap-3 text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-50">
              <Video size={20} /> Teleconsultation
            </Link>
            <Link to="/partner-login" onClick={toggleMenu} className="flex items-center gap-3 text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-50">
              <Store size={20} /> Partner Dashboard
            </Link>
            <Link to="/emergency" onClick={toggleMenu} className="flex items-center gap-3 text-red-600 bg-red-50 p-2 rounded-lg">
              <AlertTriangle size={20} /> Emergency SOS
            </Link>

            <button onClick={seedDatabase} className="flex items-center gap-3 text-slate-400 p-2 rounded-lg hover:bg-slate-50 text-sm">
              Seed Database (Dev)
            </button>

            {user ? (
              <button onClick={() => { logout(); toggleMenu(); }} className="flex items-center gap-3 text-red-500 p-2 rounded-lg hover:bg-red-50">
                <LogOut size={20} /> Sign Out
              </button>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="bg-teal-600 text-white text-center py-2 rounded-lg font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};