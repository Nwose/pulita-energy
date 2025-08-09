import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const { email, password } = args;

    if (!email || !password) {
      throw new Error("Missing fields");
    }

    // Try a simpler query first
    const allUsers = await ctx.db.query("users").collect();
    const user = allUsers.find((u) => u.email === email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // For now, we'll do a simple password check
    // In production, you'd want to use proper hashing
    if (password !== user.password) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  },
});

export const register = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { email, password, role = "admin" } = args;

    if (!email || !password) {
      throw new Error("Missing fields");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create user (in production, hash the password)
    const userId = await ctx.db.insert("users", {
      email,
      password, // In production, this should be hashed
      role,
      createdAt: Date.now(),
    });

    return { id: userId };
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map((user) => ({
      id: user._id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  },
});

export const deleteUser = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
