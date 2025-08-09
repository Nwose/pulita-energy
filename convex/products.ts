import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      // .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();

    console.log("Products from Convex query:", products);

    return products.map((product) => ({
      _id: product._id,
      id: product._id as string,
      title: product.title,
      text: product.text,
      image: product.image,
      icons: product.icons,
      details: product.details,
      pdfs: product.pdfs ? JSON.parse(JSON.stringify(product.pdfs)) : [],
      isActive: product.isActive,
    }));
  },
});

export const createProduct = mutation({
  args: {
    title: v.string(),
    text: v.string(),
    image: v.string(),
    icons: v.array(v.string()),
    details: v.optional(v.string()),
    pdfs: v.optional(v.any()),
    isActive: v.boolean(),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return productId;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    title: v.optional(v.string()),
    text: v.optional(v.string()),
    image: v.optional(v.string()),
    icons: v.optional(v.array(v.string())),
    details: v.optional(v.string()),
    pdfs: v.optional(v.any()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateAllProductsToActive = mutation({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    for (const product of products) {
      await ctx.db.patch(product._id, { isActive: true });
    }
    return products.length;
  },
});
