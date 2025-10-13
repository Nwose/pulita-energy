import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(),
    role: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()),
    author: v.string(),
    authorAvatar: v.string(),
    authorId: v.optional(v.string()),
    date: v.float64(),
    createdAt: v.float64(),
    updatedAt: v.float64(),
  }).index("by_slug", ["slug"])
    .index("by_author", ["authorId"]),

  projects: defineTable({
    challenges: v.array(v.string()),
    date: v.string(),
    details: v.string(),
    images: v.array(v.string()),
    name: v.string(),
    summary: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    authorId: v.optional(v.string()),
  }).index("by_author", ["authorId"]),

  products: defineTable({
    title: v.string(),
    text: v.string(),
    images: v.optional(v.array(v.string())), // Make optional for migration
    image: v.optional(v.string()), // Keep old field for backward compatibility
    icons: v.array(v.string()),
    details: v.optional(v.string()),
    pdfs: v.optional(v.any()),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
    authorId: v.optional(v.string()),
  })
    .index("by_author", ["authorId"])
    .index("by_active", ["isActive"]),
});
