// src/lib/api/blogs.js
// Dual-mode API client:
//   - DEMO MODE  : token === 'demo-mode' → uses local in-memory mock data (no backend needed)
//   - REAL MODE  : uses the Express backend via Vite proxy

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('solar_token');
const isDemoMode = () => getToken() === 'demo-mode';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ─── Demo Mode: in-memory mock data ───────────────────────────
// Seeded with example posts so the app looks populated immediately.
let mockPosts = [
  {
    _id: 'demo-post-001',
    title: 'Welcome to SolarScope Blog',
    content: 'This is a demo post. In demo mode, all data lives in memory and resets on refresh. Register or log in to save posts permanently to MongoDB.',
    author: { _id: 'demo-user', name: 'Demo User' },
    createdAt: new Date('2026-07-10T08:00:00Z').toISOString(),
    updatedAt: new Date('2026-07-10T08:00:00Z').toISOString(),
  },
  {
    _id: 'demo-post-002',
    title: 'Understanding Solar Irradiance',
    content: 'Solar irradiance measures power of solar radiation received per unit area. SolarScope collects, cleans, and visualises this data in real time.',
    author: { _id: 'other-demo-user', name: 'Priya' },
    createdAt: new Date('2026-07-12T10:30:00Z').toISOString(),
    updatedAt: new Date('2026-07-12T10:30:00Z').toISOString(),
  },
];

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));
const generateId = () => `demo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// ─── GET /api/blogs ─────────────────────────────────────────────
// Public — no auth token required
export async function getBlogs() {
  if (isDemoMode()) {
    await delay();
    return [...mockPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const res  = await fetch(`${BASE_URL}/blogs`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch posts');
  return data;
}

// ─── POST /api/blogs ────────────────────────────────────────────
export async function createBlog({ title, content }) {
  if (isDemoMode()) {
    await delay();
    if (!title?.trim() || !content?.trim()) throw new Error('Title and content are required.');
    const newPost = {
      _id: generateId(),
      title: title.trim(),
      content: content.trim(),
      author: { _id: 'demo-user', name: 'Demo User' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockPosts.push(newPost);
    return newPost;
  }

  const res  = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create post');
  return data;
}

// ─── PUT /api/blogs/:id ─────────────────────────────────────────
export async function updateBlog(id, { title, content }) {
  if (isDemoMode()) {
    await delay();
    const index = mockPosts.findIndex((p) => p._id === id);
    if (index === -1) throw new Error('Post not found.');
    if (mockPosts[index].author._id !== 'demo-user') throw new Error('You do not have permission to edit this post.');
    if (!title?.trim() || !content?.trim()) throw new Error('Title and content are required.');
    mockPosts[index] = { ...mockPosts[index], title: title.trim(), content: content.trim(), updatedAt: new Date().toISOString() };
    return mockPosts[index];
  }

  const res  = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update post');
  return data;
}

// ─── DELETE /api/blogs/:id ──────────────────────────────────────
export async function deleteBlog(id) {
  if (isDemoMode()) {
    await delay();
    const index = mockPosts.findIndex((p) => p._id === id);
    if (index === -1) throw new Error('Post not found.');
    if (mockPosts[index].author._id !== 'demo-user') throw new Error('You do not have permission to delete this post.');
    mockPosts.splice(index, 1);
    return { message: 'Deleted.' };
  }

  const res  = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete post');
  return data;
}
