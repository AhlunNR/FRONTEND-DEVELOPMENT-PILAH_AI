import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LandingPage from './pages/LandingPage';
import BerandaPage from './pages/BerandaPage';
import ScanPage from './pages/ScanPage';
import AktifitasPage from './pages/AktifitasPage';
import DompetPage from './pages/DompetPage';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/beranda" element={<BerandaPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/aktifitas" element={<AktifitasPage />} />
          <Route path="/dompet" element={<DompetPage />} />
          <Route path="/profil" element={<div className="p-4 text-center mt-20">Fitur Profil akan datang</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
