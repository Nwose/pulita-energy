import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").order("desc").collect();
    return projects;
  },
});

export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createProject = mutation({
  args: {
    challenges: v.array(v.string()),
    date: v.string(),
    details: v.string(),
    images: v.array(v.string()),
    name: v.string(),
    summary: v.string(),
    authorId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return projectId;
  },
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    challenges: v.optional(v.array(v.string())),
    date: v.optional(v.string()),
    details: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    name: v.optional(v.string()),
    summary: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteProject = mutation({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
