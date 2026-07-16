// backend/controllers/blogController.js
//
// Pure business logic — no routing here.
// Each function maps 1-to-1 to a route in blogRoutes.js.
// req.user is attached by your existing requireAuth middleware.
// req.blog is attached by requireOwnership (for update and delete).

import Blog from '../models/Blog.js';
import mongoose from 'mongoose';

// ── GET /api/blogs ─────────────────────────────────────────────
// Returns all posts sorted newest-first, with author name and _id populated.
export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name _id')   // only expose name and _id from User
      .sort({ createdAt: -1 });          // newest first
    res.json(blogs);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ── GET /api/blogs/:id ─────────────────────────────────────────
export const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const blog = await Blog.findById(id).populate('author', 'name _id');
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ── POST /api/blogs ────────────────────────────────────────────
// author is set from req.user.id — NEVER from the request body.
export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const blog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: req.user.id,   // server sets this — client cannot fake it
    });

    // Populate author so the response matches the shape the frontend expects
    await blog.populate('author', 'name _id');
    res.status(201).json(blog);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ── PUT /api/blogs/:id ─────────────────────────────────────────
// requireOwnership already verified ownership and attached req.blog.
export const updateBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    req.blog.title   = title.trim();
    req.blog.content = content.trim();
    await req.blog.save();
    await req.blog.populate('author', 'name _id');
    res.json(req.blog);
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// ── DELETE /api/blogs/:id ──────────────────────────────────────
// requireOwnership already verified ownership and attached req.blog.
export const deleteBlog = async (req, res) => {
  try {
    await req.blog.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
