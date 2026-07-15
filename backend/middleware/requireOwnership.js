// backend/middleware/requireOwnership.js
//
// Express middleware that runs AFTER requireAuth on PUT and DELETE routes.
// It loads the blog post and checks that req.user.id matches blog.author.
//
// Usage in routes:
//   router.put('/:id',    requireAuth, requireOwnership, updateBlog);
//   router.delete('/:id', requireAuth, requireOwnership, deleteBlog);

import mongoose from 'mongoose';
import Blog from '../models/Blog.js';

export const requireOwnership = async (req, res, next) => {
  const { id } = req.params;

  // Validate the :id param is a proper MongoDB ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid post id' });
  }

  try {
    const blog = await Blog.findById(id);

    // 404 — post doesn't exist
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // 403 — logged-in user is not the author
    // blog.author is an ObjectId, so we convert both sides to string for comparison
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You do not have permission to modify this post' });
    }

    // Attach the blog to req so the controller doesn't need to fetch it again
    req.blog = blog;
    next();

  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
