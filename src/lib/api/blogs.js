// src/lib/api/blogs.js
//
// This file acts as a fake "database" and API layer.
// It lives entirely in memory — no server, no network requests.
// When you later connect a real Express/MongoDB backend,
// you only need to change THIS file. All components stay the same.

// ─── Seed Data ────────────────────────────────────────────────
// These are 2 pre-existing posts so the blog isn't empty on first load.
// Think of them as rows already in your database.

let posts = [
  {
    _id: "post-001",
    title: "Welcome to SolarScope Blog",
    content:
      "This is the first post on SolarScope. Here we'll share updates about solar monitoring, data insights, and community news. Stay tuned for more!",
    author: { _id: "user-001", name: "Dhruv" },
    createdAt: new Date("2026-07-10T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-07-10T08:00:00Z").toISOString(),
  },
  {
    _id: "post-002",
    title: "Understanding Solar Irradiance Data",
    content:
      "Solar irradiance measures the power of solar radiation received per unit area. In this post we break down how SolarScope collects, cleans, and visualises this data in real time.",
    author: { _id: "user-002", name: "Priya" },
    createdAt: new Date("2026-07-12T10:30:00Z").toISOString(),
    updatedAt: new Date("2026-07-12T10:30:00Z").toISOString(),
  },
];

// ─── Mock Current User ─────────────────────────────────────────
// This simulates a logged-in user session.
// In a real app this would come from your auth token / JWT / session cookie.
// Change the _id or name here to test ownership logic (Edit/Delete buttons).

export const CURRENT_USER = {
  _id: "user-001",
  name: "Dhruv",
};

// ─── Helper: generate a simple unique ID ──────────────────────
// Replaces MongoDB's ObjectId for local use only.
const generateId = () => `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// ─── API Functions ─────────────────────────────────────────────
// Each function is async so that when you swap this for real fetch()
// calls later, nothing in the components needs to change.
// The small delay (300ms) simulates a real network round-trip.

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// GET /api/blogs  →  Returns all posts, newest first
export async function getBlogs() {
  await delay();
  // Sort by createdAt descending (newest post at the top)
  return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// POST /api/blogs  →  Creates a new post, returns the created post
export async function createBlog({ title, content }) {
  await delay();

  // Basic validation — mirrors what the real Express route would do
  if (!title?.trim() || !content?.trim()) {
    throw new Error("Title and content are required.");
  }

  const newPost = {
    _id: generateId(),
    title: title.trim(),
    content: content.trim(),
    author: CURRENT_USER,           // server would set this from req.user — never from the form body
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.push(newPost);
  return newPost;
}

// PUT /api/blogs/:id  →  Edits title/content of an existing post
export async function updateBlog(id, { title, content }) {
  await delay();

  const index = posts.findIndex((p) => p._id === id);

  // 404 — post doesn't exist
  if (index === -1) throw new Error("Blog post not found.");

  // 403 — ownership check (mirrors requireOwnership middleware on the server)
  if (posts[index].author._id !== CURRENT_USER._id) {
    throw new Error("You do not have permission to edit this post.");
  }

  // 400 — missing fields
  if (!title?.trim() || !content?.trim()) {
    throw new Error("Title and content are required.");
  }

  // Apply the update in place
  posts[index] = {
    ...posts[index],
    title: title.trim(),
    content: content.trim(),
    updatedAt: new Date().toISOString(),
  };

  return posts[index];
}

// DELETE /api/blogs/:id  →  Removes a post permanently
export async function deleteBlog(id) {
  await delay();

  const index = posts.findIndex((p) => p._id === id);

  // 404
  if (index === -1) throw new Error("Blog post not found.");

  // 403
  if (posts[index].author._id !== CURRENT_USER._id) {
    throw new Error("You do not have permission to delete this post.");
  }

  posts.splice(index, 1); // remove from the in-memory array
  return { message: "Post deleted successfully." };
}
