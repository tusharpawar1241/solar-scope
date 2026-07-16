// src/App.jsx
// Public routing — no auth gate on any route.
// Anyone can browse Home, Blog, and About.
// Auth is enforced at the action level (create/edit/delete a post requires login).

import { Routes, Route, Navigate } from 'react-router-dom';
import Home      from './assets/components/Home/Home';
import BlogPage  from './assets/components/blog/BlogPage';
import Navbar    from './assets/components/Navbar';
import LoginPage from './assets/components/LoginPage';

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
