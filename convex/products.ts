import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();

    // Convert old image format to new images format for backward compatibility
    return products.map(product => ({
      ...product,
      images: product.images || (product.image ? [product.image] : []),
      image: undefined, // Remove old field
    }));
  },
});

export const getProduct = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);

    if (!product) return null;

    // Convert old image format to new images format
    return {
      ...product,
      images: product.images || (product.image ? [product.image] : []),
      image: undefined, // Remove old field
    };
  },
});

export const createProduct = mutation({
  args: {
    title: v.string(),
    text: v.string(),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    icons: v.array(v.string()),
    details: v.optional(v.string()),
    pdfs: v.optional(v.any()),
    isActive: v.boolean(),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Convert single image to images array for backward compatibility
    const images = args.images || (args.image ? [args.image] : []);

    return await ctx.db.insert("products", {
      title: args.title,
      text: args.text,
      images, // Use new array format
      image: args.image, // Keep old format for migration
      icons: args.icons,
      details: args.details,
      pdfs: args.pdfs,
      isActive: args.isActive,
      authorId: args.authorId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    title: v.optional(v.string()),
    text: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    icons: v.optional(v.array(v.string())),
    details: v.optional(v.string()),
    pdfs: v.optional(v.any()),
    isActive: v.optional(v.boolean()),
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

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const activateAllProducts = mutation({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    for (const product of products) {
      await ctx.db.patch(product._id, { isActive: true });
    }
    return products.length;
  },
});