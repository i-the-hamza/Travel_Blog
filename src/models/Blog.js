import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for your blog'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content for your blog'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide a short excerpt for your blog'],
      maxlength: [200, 'Excerpt cannot be more than 200 characters'],
    },
    featuredImage: {
      type: String,
      required: [true, 'Please provide a featured image for your blog'],
    },
    country: {
      type: String,
      required: [true, 'Please specify the country this blog is about'],
    },
    tags: {
      type: [String],
    },
    isPremium: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seoTitle: String,
    seoDescription: String,
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index for search functionality
BlogSchema.index({ title: 'text', content: 'text', country: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema); 