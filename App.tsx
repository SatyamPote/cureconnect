import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { PartnerLoginPage } from './pages/PartnerLoginPage';
import { PrescriptionUpload } from './pages/PrescriptionUpload';
import { EmergencyPage } from './pages/EmergencyPage';
import { PharmacyDashboard } from './pages/PharmacyDashboard';
import { RemindersPage } from './pages/RemindersPage';
import { TeleconsultationPage } from './pages/TeleconsultationPage';
import { AIChatbot } from './components/AIChatbot';
import { TourGuide } from './components/TourGuide';

const App = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <TourGuide />
          <main className="flex-1 max-w-4xl w-full mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/upload-prescription" element={<PrescriptionUpload />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/teleconsult" element={<TeleconsultationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/partner-login" element={<PartnerLoginPage />} />
            </Routes>
          </main>
          <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
            <p>© {new Date().getFullYear()} CureConnect. Real-time Medicine Finder.</p>
          </footer>
          <AIChatbot />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;