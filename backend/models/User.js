// backend/models/User.js
// Mongoose schema for a registered user.
// Password is hashed with bcrypt before saving — never stored as plain text.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name must be 50 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,       // enforced at DB level — no two accounts with same email
      lowercase: true,    // always stored lowercase regardless of input
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  { timestamps: true }
);

// ── Pre-save hook: hash the password before writing to DB ──────
// Only runs if password was actually changed (prevents re-hashing on other updates)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12); // 12 = bcrypt salt rounds
  next();
});

// ── Instance method: compare a plain-text password against the hash ──
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
