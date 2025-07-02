"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  features?: string;
  specifications?: string;
  price?: number;
  isActive: boolean;
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function fetchProducts() {
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products);
    } else if (res.status === 403) {
      router.replace("/admin/login");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleImageUpload(file: File) {
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
        setForm({ ...form, image: data.url });
        setError("");
      } else {
        setError("Image upload failed");
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const method = editingId ? "PUT" : "POST";
    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({});
      setEditingId(null);
      setError("");
      fetchProducts();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save product");
    }
  }

  function handleEdit(product: Product) {
    setForm(product);
    setEditingId(product.id);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    if (res.ok) fetchProducts();
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
                href="/admin/users"
                className="text-gray-600 hover:text-gray-800"
              >
                Users
              </Link>
              <Link
                href="/admin/projects"
                className="text-gray-600 hover:text-gray-800"
              >
                Projects
              </Link>
              <Link
                href="/admin/products"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Products
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
            Product Management
          </h2>

          {/* Product Form */}
          <form onSubmit={handleSubmit} className="mb-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  name="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
                  value={form.name || ""}
                  onChange={handleChange}
                  placeholder="Enter product name..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  name="category"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  value={form.category || ""}
                  onChange={handleChange}
                  placeholder="e.g., Solar Panels, Inverters, etc."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base leading-relaxed"
                rows={4}
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Describe the product features and benefits..."
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Features
                </label>
                <textarea
                  name="features"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  rows={3}
                  value={form.features || ""}
                  onChange={handleChange}
                  placeholder="List key features of the product..."
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Specifications
                </label>
                <textarea
                  name="specifications"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  rows={3}
                  value={form.specifications || ""}
                  onChange={handleChange}
                  placeholder="Technical specifications..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  value={form.price || ""}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
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
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    name="isActive"
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    checked={form.isActive !== false}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Active Product
                  </span>
                </label>
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
                  ? "Update Product"
                  : "Create Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="text-gray-500 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setEditingId(null);
                    setForm({});
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* Product List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              All Products
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No products yet. Create your first one above!
                </p>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">
                            {product.name}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              product.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Category: {product.category}</span>
                          {product.price && (
                            <span>Price: ${product.price}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-700 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                          onClick={() => handleEdit(product)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded hover:bg-red-50"
                          onClick={() => handleDelete(product.id)}
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
