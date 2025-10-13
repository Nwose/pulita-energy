import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBlogs = query({
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").collect();

    // Convert old image format to new images format for backward compatibility
    return blogs.map(blog => ({
      ...blog,
      images: blog.images || (blog.image ? [blog.image] : []),
      image: undefined, // Remove old field
    }));
  },
});

export const getBlog = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!blog) return null;

    // Convert old image format to new images format
    return {
      ...blog,
      images: blog.images || (blog.image ? [blog.image] : []),
      image: undefined, // Remove old field
    };
  },
});

export const createBlog = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    author: v.string(),
    authorAvatar: v.string(),
    date: v.float64(),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Convert single image to images array for backward compatibility
    const images = args.images || (args.image ? [args.image] : []);

    return await ctx.db.insert("blogs", {
      title: args.title,
      slug: args.slug,
      excerpt: args.excerpt,
      content: args.content,
      images, // Use new array format
      image: args.image, // Keep old format for migration
      author: args.author,
      authorAvatar: args.authorAvatar,
      date: args.date,
      authorId: args.authorId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    author: v.optional(v.string()),
    authorAvatar: v.optional(v.string()),
    date: v.optional(v.float64()),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();

    // Convert single image to images array if provided
    if (updates.image && !updates.images) {
      updates.images = [updates.image];
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: now,
    });
  },
});

export const deleteBlog = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
