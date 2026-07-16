// backend/models/Blog.js
// Mongoose schema for a blog post.
// Run: npm install mongoose  (in your backend folder)

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    // References the existing User document — no new user logic needed.
    // populate('author', 'name _id') on read gives { name, _id } to the frontend.
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title must be 150 characters or fewer'],
    },

    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields.
    // These are server-managed — never settable from client body.
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
