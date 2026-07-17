// src/lib/api/auth.js
// Client-side auth helpers — register, login, session management in localStorage.
// All components import from here instead of touching localStorage directly.

// In dev: /api goes through Vite proxy → localhost:5000
// In prod: direct URL to Render backend (CORS is open)
const BASE_URL = import.meta.env.DEV
  ? '/api'
  : 'https://solar-scope-backend.onrender.com/api';

// ── Register a new account ─────────────────────────────────────
export async function register({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data; // { token, user: { _id, name, email } }
}

// ── Log in to an existing account ─────────────────────────────
export async function login({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data; // { token, user: { _id, name, email } }
}

// ── Persist session to localStorage ───────────────────────────
export function saveSession(token, user) {
  localStorage.setItem('solar_token', token);
  localStorage.setItem('solar_user', JSON.stringify(user));
}

// ── Read session from localStorage ────────────────────────────
// Returns { token, user } — both null if not logged in
export function getSession() {
  const token = localStorage.getItem('solar_token');
  const user  = JSON.parse(localStorage.getItem('solar_user') || 'null');
  return { token, user };
}

// ── Clear session (logout) ─────────────────────────────────────
export function clearSession() {
  localStorage.removeItem('solar_token');
  localStorage.removeItem('solar_user');
}

// ── Enter demo mode (no backend needed) ───────────────────────
// Sets a special 'demo-mode' token. blogs.js detects this and
// switches to the local in-memory mock data layer automatically.
export function enterDemoMode() {
  localStorage.setItem('solar_token', 'demo-mode');
  localStorage.setItem('solar_user', JSON.stringify({ _id: 'demo-user', name: 'Demo User' }));
}
