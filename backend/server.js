// backend/server.js
// Express app entry point.
// Connects to MongoDB, sets up middleware, mounts all routes, starts listening.

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();

// ── Middleware ─────────────────────────────────────────────────
// Temporarily accepting all origins to rule out CORS as the issue.
// Will be locked to specific Vercel domain once routing is confirmed.
app.use(cors({ origin: true, credentials: true }));

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/auth',  authRoutes);   // POST /api/auth/register, /api/auth/login
app.use('/api/blogs', blogRoutes);   // GET/POST/PUT/DELETE /api/blogs

// ── Health check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ── Connect to MongoDB, then start server ──────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
