"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaPlug,
  FaCog,
  FaBus,
  FaGlobe,
  FaFlask,
  FaTachometerAlt,
  FaLock,
  FaTimes,
  FaUpload,
  FaImage,
} from "react-icons/fa";

interface Product {
  _id?: string;
  id?: string;
  title: string;
  text: string;
  images: string[];
  icons: string[];
  details?: string;
  pdfs?: { name: string; file: string; downloadUrl?: string }[];
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({
    icons: [],
    pdfs: [],
    images: [],
    isActive: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

  const availableIcons = [
    "FaPlug",
    "FaCog",
    "FaBus",
    "FaGlobe",
    "FaFlask",
    "FaTachometerAlt",
    "FaLock",
  ];

  const iconMap: Record<string, any> = {
    FaPlug,
    FaCog,
    FaBus,
    FaGlobe,
    FaFlask,
    FaTachometerAlt,
    FaLock,
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

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

  async function handleImageUpload(file: File) {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "products");

    try {
      console.log("Uploading file:", file.name, "Size:", file.size);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Upload successful, received URL:", data.url);

        // Use functional update to ensure we don't lose previous images
        setForm(prevForm => {
          const currentImages = prevForm.images || [];
          const newImages = [...currentImages, data.url];
          console.log("Updated images array:", newImages);
          return { ...prevForm, images: newImages };
        });

        setError("");
      } else {
        const errorData = await res.json();
        console.error("Upload failed:", errorData);
        setError(errorData.error || "Image upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Image upload failed");
    } finally {
      setImageUploading(false);
    }
  }

  async function handlePdfUpload(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "products"); // Make sure this matches your Cloudinary preset

    try {
      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const newPdf = {
          name: file.name.replace(/\.[^/.]+$/, ""),
          file: data.url,
          downloadUrl: data.url,
        };
        setForm({
          ...form,
          pdfs: [...(form.pdfs || []), newPdf],
        });
        setError("");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "PDF upload failed");
      }
    } catch (err) {
      setError("PDF upload failed");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePdfNameChange(index: number, name: string) {
    const updatedPdfs = [...(form.pdfs || [])];
    updatedPdfs[index] = { ...updatedPdfs[index], name };
    setForm({ ...form, pdfs: updatedPdfs });
  }

  function removePdf(index: number) {
    const updatedPdfs = [...(form.pdfs || [])];
    updatedPdfs.splice(index, 1);
    setForm({ ...form, pdfs: updatedPdfs });
  }

  function removeImage() {
    setForm({ ...form, images: [] });
  }

  function removeImageByIndex(idx: number) {
    const updated = [...(form.images || [])];
    updated.splice(idx, 1);
    setForm({ ...form, images: updated });
  }

  function toggleIcon(iconName: string) {
    const currentIcons = form.icons || [];
    const newIcons = currentIcons.includes(iconName)
      ? currentIcons.filter(icon => icon !== iconName)
      : [...currentIcons, iconName];
    setForm({ ...form, icons: newIcons });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!form.images || form.images.length === 0) {
      setError("Please upload at least one image");
      setLoading(false);
      return;
    }

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...form } : form;

    console.log("Submitting product data:", JSON.stringify(body, null, 2));

    const res = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setForm({ icons: [], pdfs: [], images: [], isActive: true });
      setEditingId(null);
      setError("");
      setSuccess(editingId ? "Product updated successfully!" : "Product created successfully!");
      fetchProducts();
    } else {
      const data = await res.json();
      console.error("API Error response:", data);
      setError(data.error || "Failed to save product");
    }
  }

  function handleEdit(product: Product) {
    setForm({
      title: product.title || "",
      text: product.text || "",
      images: product.images || [],
      icons: product.icons || [],
      details: product.details || "",
      pdfs: product.pdfs || [],
      isActive: product.isActive !== undefined ? product.isActive : true,
    });
    setEditingId(product._id || product.id || null);
  }

  async function deleteProduct(product: Product) {
    if (!confirm("Delete this product?")) return;
    
    const productId = product._id || product.id;
    if (!productId) {
      setError("Error: No valid product ID found");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    });
    setLoading(false);
    
    if (res.ok) {
      setSuccess("Product deleted successfully!");
      fetchProducts();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to delete product");
    }
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
                className="text-gray-600 hover:text-gray-800"
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
                className="text-blue-600 hover:text-blue-800 font-medium"
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
            Product Management
          </h2>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Live Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <div className="max-w-sm mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-lg border">
                {form.images && form.images.length > 0 ? (
                  <img
                    src={form.images[0]}
                    alt={form.title || "Product image"}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <FaImage className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {form.title || "Product Title"}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {form.text || "Product description will appear here."}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(form.icons || []).map((iconName, idx) => {
                    const Icon = iconMap[iconName];
                    return Icon ? (
                      <Icon key={idx} className="w-5 h-5 text-blue-600" />
                    ) : null;
                  })}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  form.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {form.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Product Form */}
          <form onSubmit={handleSubmit} className="mb-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.title || ""}
                  onChange={handleChange}
                  placeholder="Enter product title..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.text || ""}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows={3}
                  required
                />
              </div>
              
              {/* Image Upload Section */}
              <div className="lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Product Images
                </label>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(form.images || []).map((img, idx) => (
                      <div key={`product-image-${idx}`} className="relative group">
                        <img
                          src={img}
                          alt="product"
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImageByIndex(idx)}
                          className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-600 group-hover:bg-opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload product images
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, WEBP up to 10MB each
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          for (const file of Array.from(files)) {
                            if (file.size > 10 * 1024 * 1024) {
                              setError("Image must be less than 10MB");
                              return;
                            }
                            handleImageUpload(file);
                          }
                        }
                      }}
                    />
                  </label>
                  {imageUploading && (
                    <div className="text-sm text-blue-600">Uploading image...</div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  name="details"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.details || ""}
                  onChange={handleChange}
                  placeholder="Additional product details..."
                  rows={3}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Icons
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {availableIcons.map((iconName) => {
                  const Icon = iconMap[iconName];
                  const isSelected = (form.icons || []).includes(iconName);
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => toggleIcon(iconName)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        isSelected
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      title={iconName}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
              <div className="text-sm text-gray-500">
                Selected: {(form.icons || []).join(", ") || "None"}
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                PDFs
              </label>
              <div className="space-y-2 mb-3">
                {(form.pdfs || []).map((pdf, index) => (
                  <div
                    key={`pdf-${index}`}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="text"
                      value={pdf.name}
                      onChange={(e) =>
                        handlePdfNameChange(index, e.target.value)
                      }
                      className="flex-1 p-2 text-sm border border-gray-300 rounded"
                      placeholder="PDF Name"
                    />
                    <a
                      href={pdf.downloadUrl || pdf.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm px-2"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => removePdf(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer p-2 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50">
                <FaUpload />
                <span>Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 20 * 1024 * 1024) {
                        setError("PDF must be less than 20MB");
                        return;
                      }
                      handlePdfUpload(file);
                    }
                  }}
                />
              </label>
              {uploading && (
                <div className="text-sm text-blue-600 mt-2">Uploading PDF...</div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive !== false}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Active (visible to customers)
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                disabled={loading || uploading || imageUploading}
              >
                {loading
                  ? editingId
                    ? "Updating..."
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
                    setForm({ icons: [], pdfs: [], images: [], isActive: true });
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
                      key={product._id || product.id}
                      className="bg-white p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex gap-4 flex-1">
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {product.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.text}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Icons: {product.icons?.length || 0}</span>
                            <span>Images: {product.images?.length || 0}</span>
                            <span>PDFs: {product.pdfs?.length || 0}</span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              product.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
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
                          onClick={() => deleteProduct(product)}
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