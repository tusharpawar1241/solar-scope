// src/lib/api/blogs.js
// Real API client — all calls go to the Express backend at localhost:5000.
// JWT from localStorage is attached to every request as a Bearer token.
// Shape of responses matches the mock exactly, so no components need to change.

const BASE_URL = 'http://localhost:5000/api';

// Reads the JWT stored by auth.js after login
const getToken = () => localStorage.getItem('solar_token');

// Standard headers for all authenticated requests
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ── GET /api/blogs ─────────────────────────────────────────────
export async function getBlogs() {
  const res = await fetch(`${BASE_URL}/blogs`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch posts');
  return data;
}

// ── POST /api/blogs ────────────────────────────────────────────
export async function createBlog({ title, content }) {
  const res = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create post');
  return data;
}

// ── PUT /api/blogs/:id ─────────────────────────────────────────
export async function updateBlog(id, { title, content }) {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update post');
  return data;
}

// ── DELETE /api/blogs/:id ──────────────────────────────────────
export async function deleteBlog(id) {
  const res = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete post');
  return data;
}
