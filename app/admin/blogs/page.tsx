"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: number;
}

// Helper function to validate image URLs
function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    authorAvatar: "",
    date: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function fetchBlogs() {
    const res = await fetch("/api/admin/blogs");
    if (res.ok) {
      const data = await res.json();
      setBlogs(data.blogs);
    } else if (res.status === 403) {
      router.replace("/admin/login");
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleImageUpload(
    file: File,
    field: "image" | "authorAvatar"
  ) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, [field]: data.url });
        setError("");
      } else {
        setError("Image upload failed");
      }
    } catch {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/admin/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({});
      setEditingId(null);
      setError("");
      fetchBlogs();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save blog");
    }
  }

  function handleEdit(blog: Blog) {
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      author: blog.author || "",
      authorAvatar: blog.authorAvatar || "",
      date: blog.date || 0,
    });
    setEditingId(blog.id);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    if (res.ok) fetchBlogs();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Pulita Energy Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-800"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/blogs"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Blogs
              </Link>
              <Link
                href="/admin/projects"
                className="text-gray-600 hover:text-gray-800"
              >
                Projects
              </Link>
              <Link
                href="/admin/products"
                className="text-gray-600 hover:text-gray-800"
              >
                Products
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-600 hover:text-gray-800"
              >
                Users
              </Link>
              <button
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  router.push("/admin/login");
                }}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            Blog Management
          </h2>

          {/* Blog Form */}
          <form onSubmit={handleSubmit} className="mb-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
                  value={form.title || ""}
                  onChange={handleChange}
                  placeholder="Enter blog post title..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Slug
                </label>
                <input
                  name="slug"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  value={form.slug || ""}
                  onChange={handleChange}
                  placeholder="blog-post-url-slug"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <input
                name="excerpt"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                value={form.excerpt || ""}
                onChange={handleChange}
                placeholder="Brief summary of the blog post..."
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                name="content"
                className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base leading-relaxed"
                rows={12}
                value={form.content || ""}
                onChange={handleChange}
                placeholder="Write your blog post content here. You can use basic formatting like **bold** and *italic* text..."
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "image");
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
                {form.image && (
                  <div className="mt-2">
                    {isValidImageUrl(form.image) ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-32 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
                {uploading && (
                  <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Author Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, "authorAvatar");
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
                {form.authorAvatar && (
                  <div className="mt-2">
                    {isValidImageUrl(form.authorAvatar) ? (
                      <img
                        src={form.authorAvatar}
                        alt="Avatar"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  name="author"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  value={form.author || ""}
                  onChange={handleChange}
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Publish Date
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  value={
                    form.date
                      ? new Date(form.date).toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                disabled={loading || uploading}
              >
                {loading
                  ? editingId
                    ? "Saving..."
                    : "Creating..."
                  : editingId
                    ? "Update Blog Post"
                    : "Create Blog Post"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="text-gray-500 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      slug: "",
                      excerpt: "",
                      content: "",
                      image: "",
                      author: "",
                      authorAvatar: "",
                      date: 0,
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* Blog List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              All Blog Posts
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {blogs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No blog posts yet. Create your first one above!
                </p>
              ) : (
                <div className="space-y-3">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-white p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {blog.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Slug: {blog.slug}</span>
                          <span>
                            Date:{" "}
                            {blog.date
                              ? new Date(blog.date).toISOString().slice(0, 10)
                              : ""}
                          </span>
                          <span>Author: {blog.author}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-700 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                          onClick={() => handleEdit(blog)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded hover:bg-red-50"
                          onClick={() => handleDelete(blog.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
