"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useProducts() {
  return useQuery(api.products.getProducts);
}

export function useProjects() {
  return useQuery(api.projects.getProjects);
}

export function useBlogs() {
  return useQuery(api.blogs.getBlogs);
}

export function useBlog(slug: string) {
  return useQuery(api.blogs.getBlog, { slug });
}

export function useProject(id: string) {
  return useQuery(api.projects.getProject, { id });
}

// Mutations
export function useCreateProduct() {
  return useMutation(api.products.createProduct);
}

export function useUpdateProduct() {
  return useMutation(api.products.updateProduct);
}

export function useDeleteProduct() {
  return useMutation(api.products.deleteProduct);
}

export function useCreateProject() {
  return useMutation(api.projects.createProject);
}

export function useUpdateProject() {
  return useMutation(api.projects.updateProject);
}

export function useDeleteProject() {
  return useMutation(api.projects.deleteProject);
}

export function useCreateBlog() {
  return useMutation(api.blogs.createBlog);
}

export function useUpdateBlog() {
  return useMutation(api.blogs.updateBlog);
}

export function useDeleteBlog() {
  return useMutation(api.blogs.deleteBlog);
}

export function useLogin() {
  return useMutation(api.auth.login);
}

export function useRegister() {
  return useMutation(api.auth.register);
}
