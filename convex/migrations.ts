import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Migration function to convert existing blog documents from image to images array
export const migrateBlogsToImagesArray = mutation({
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").collect();

    for (const blog of blogs) {
      // If the blog has an image field but no images array, migrate it
      if (blog.image && !blog.images) {
        await ctx.db.patch(blog._id, {
          images: [blog.image],
          // Keep the original image field for now in case of rollback
        });
      }
    }

    return { migrated: blogs.length };
  },
});

// Migration function to convert existing product documents from image to images array
export const migrateProductsToImagesArray = mutation({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();

    for (const product of products) {
      // If the product has an image field but no images array, migrate it
      if (product.image && !product.images) {
        await ctx.db.patch(product._id, {
          images: [product.image],
          // Keep the original image field for now in case of rollback
        });
      }
    }

    return { migrated: products.length };
  },
});
