import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Check if model is already defined to prevent overwriting it in development due to hot reloading
export default mongoose.models.User || mongoose.model('User', UserSchema); 