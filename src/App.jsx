// src/App.jsx
// Auth-gated routing:
//   - ProtectedRoute redirects to /login if no JWT in localStorage
//   - /login is public
//   - All other routes require login

import { Routes, Route, Navigate } from 'react-router-dom';
import Home     from './assets/components/Home/Home';
import BlogPage from './assets/components/blog/BlogPage';
import Navbar   from './assets/components/Navbar';
import LoginPage from './assets/components/LoginPage';
import { getSession } from './lib/api/auth';

// Wraps any route that requires authentication.
// If no token is found in localStorage → redirect to /login.
const ProtectedRoute = ({ children }) => {
  const { token } = getSession();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <div>
      <Routes>

        {/* ── Public route — no Navbar, full-screen layout ── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── Protected routes — all show Navbar ──────────── */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Navbar />
              <Routes>

                <Route path="/" element={<Home />} />

                <Route
                  path="/blog"
                  element={
                    <main className="max-w-6xl mx-auto px-4 py-8">
                      <BlogPage />
                    </main>
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

                {/* Catch-all → home */}
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
};

export default App;
