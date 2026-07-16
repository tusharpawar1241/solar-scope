// backend/routes/blogRoutes.js
//
// Mount this router in your main server.js / app.js:
//   import blogRoutes from './routes/blogRoutes.js';
//   app.use('/api/blogs', blogRoutes);
//
// Replace `requireAuth` with your actual auth middleware import.

import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireOwnership } from '../middleware/requireOwnership.js';
import {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';

const router = express.Router();

// Public routes — anyone can read
router.get('/',     listBlogs);            // GET  /api/blogs
router.get('/:id',  getBlog);             // GET  /api/blogs/:id

// Auth required — must be logged in to write
router.post('/',    requireAuth, createBlog);  // POST /api/blogs

// Edit and Delete also require ownership (runs after requireAuth)
router.put('/:id',    requireAuth, requireOwnership, updateBlog);   // PUT    /api/blogs/:id
router.delete('/:id', requireAuth, requireOwnership, deleteBlog);   // DELETE /api/blogs/:id

export default router;
