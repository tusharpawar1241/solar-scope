// src/App.jsx
// Public routing — no auth gate on public routes.
// AdminPanel is protected by AdminRoute.

import { Routes, Route, Navigate } from 'react-router-dom';
import Home      from './assets/components/Home/Home';
import Navbar    from './assets/components/Navbar';
import LoginPage from './assets/components/Login/LoginPage';
import BlogPage from './assets/components/Blogs/BlogPage';
import AdminPanel from './assets/components/Admin/AdminPanel';
import AdminRoute from './assets/components/Admin/AdminRoute';

const App = () => {
  return (
    <div>
      <Routes>

        {/* ── Login page — no Navbar, full screen ───────────── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── All other routes — public, Navbar always shown ── */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/blog" element={<BlogPage />} />

                {/* ── Protected Admin Portal Route ────────────── */}
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  } 
                />

                <Route
                  path="/about"
                  element={
                    <div className="text-center mt-20 text-white">
                      <h2 className="text-3xl font-bold">About SolarScope</h2>
                      <p className="mt-4 text-slate-400">Monitoring solar activity and data analysis.</p>
                    </div>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          }
        />

      </Routes>
    </div>
  );
};

export default App;
