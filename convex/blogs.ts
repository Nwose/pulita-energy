import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();
    return blogs;
  },
});

export const getBlog = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const createBlog = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    image: v.string(),
    author: v.string(),
    authorAvatar: v.string(),
    date: v.number(),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const blogId = await ctx.db.insert("blogs", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return blogId;
  },
});

export const updateBlog = mutation({
  args: {
    id: v.id("blogs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    image: v.optional(v.string()),
    author: v.optional(v.string()),
    authorAvatar: v.optional(v.string()),
    date: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteBlog = mutation({
  args: {
    id: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
