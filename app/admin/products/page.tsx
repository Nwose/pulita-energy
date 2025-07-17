"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaGasPump,
  FaPlug,
  FaLeaf,
  FaBolt,
  FaHome,
  FaCog,
  FaBus,
  FaGlobe,
  FaFlask,
  FaTachometerAlt,
  FaLock,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

interface Product {
  id: string;
  title: string;
  text: string;
  image: string;
  icons: string[];
  details?: string;
  pdfs?: { name: string; file: string }[];
  isActive: boolean;
}

interface ProductForm {
  title: string;
  text: string;
  image: string;
  icons: string[];
  details: string;
  pdfs: { name: string; file: string }[];
  isActive: boolean;
}

// Icon map for preview
const iconMap: Record<string, React.ElementType> = {
  FaGasPump,
  FaPlug,
  FaLeaf,
  FaBolt,
  FaHome,
  FaCog,
  FaBus,
  FaGlobe,
  FaFlask,
  FaTachometerAlt,
  FaLock,
};

// Available icons for selection
const availableIcons = [
  "FaGasPump",
  "FaPlug",
  "FaLeaf",
  "FaBolt",
  "FaHome",
  "FaCog",
  "FaBus",
  "FaGlobe",
  "FaFlask",
  "FaTachometerAlt",
  "FaLock",
];

// Image map for preview
const imageMap: Record<string, string> = {
  cng: "/assets/cng.png",
  cylinder: "/assets/cylinder.png",
  lpg: "/assets/lpg.png",
  prms: "/assets/prms.png",
  Dual: "/assets/Dual.png",
  skids: "/assets/skids.png",
  kits: "/assets/kits.png",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    text: "",
    image: "",
    icons: [],
    details: "",
    pdfs: [],
    isActive: true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [newPdfName, setNewPdfName] = useState("");
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

  async function handlePdfUpload(file: File) {
    if (!newPdfName.trim()) {
      setError("Please enter a name for the PDF");
      return;
    }

    setUploadingPdf(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const newPdf = {
          name: newPdfName,
          file: data.url,
        };
        setForm({
          ...form,
          pdfs: [...form.pdfs, newPdf],
        });
        setNewPdfName("");
        setError("");
      } else {
        setError("PDF upload failed");
      }
    } catch (err) {
      setError("PDF upload failed");
    } finally {
      setUploadingPdf(false);
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

  function handleIconToggle(iconName: string) {
    setForm({
      ...form,
      icons: form.icons.includes(iconName)
        ? form.icons.filter((icon) => icon !== iconName)
        : [...form.icons, iconName],
    });
  }

  function removePdf(index: number) {
    setForm({
      ...form,
      pdfs: form.pdfs.filter((_, i) => i !== index),
    });
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
      setForm({
        title: "",
        text: "",
        image: "",
        icons: [],
        details: "",
        pdfs: [],
        isActive: true,
      });
      setEditingId(null);
      setError("");
      fetchProducts();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save product");
    }
  }

  function handleEdit(product: Product) {
    setForm({
      title: product.title,
      text: product.text,
      image: product.image,
      icons: product.icons,
      details: product.details || "",
      pdfs: product.pdfs || [],
      isActive: product.isActive,
    });
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

  // Preview component
  const ProductPreview = () => {
    const previewImage = imageMap[form.image] || form.image;
    return (
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h4 className="font-semibold mb-3 text-gray-700">Preview</h4>
        <div className="relative overflow-hidden rounded-lg shadow-md flex flex-col md:flex-row-reverse w-full max-w-[400px] h-[200px] mx-auto group bg-white">
          {/* Image */}
          <div className="w-full md:w-1/2 h-32 md:h-full">
            {previewImage ? (
              <img
                src={previewImage}
                alt={form.title}
                className="w-full h-full object-cover rounded-none md:rounded-r-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 p-3 flex flex-col justify-between bg-[#efeded] relative z-10 rounded-l-lg md:rounded-none">
            <h2 className="text-sm font-semibold">
              {form.title || "Product Title"}
            </h2>
            <p className="text-xs text-gray-600 mt-1 flex-1">
              {form.text || "Product description"}
            </p>

            {/* Icon Row */}
            <div className="flex gap-2 mt-2">
              {form.icons.map((iconName, index) => {
                const IconComponent = iconMap[iconName];
                return IconComponent ? (
                  <div
                    key={index}
                    className="p-1 bg-[#1f1f1f]/70 text-white rounded-full"
                  >
                    <IconComponent size={12} />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Product Title
                  </label>
                  <input
                    name="title"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter product title..."
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Product Text
                  </label>
                  <textarea
                    name="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    rows={3}
                    value={form.text}
                    onChange={handleChange}
                    placeholder="Enter product description..."
                    required
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
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded"
                      />
                    </div>
                  )}
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-1">Uploading...</p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Icons
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableIcons.map((iconName) => {
                      const IconComponent = iconMap[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => handleIconToggle(iconName)}
                          className={`p-3 border rounded-lg flex items-center justify-center transition-colors ${
                            form.icons.includes(iconName)
                              ? "bg-blue-100 border-blue-300 text-blue-700"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {IconComponent && <IconComponent size={20} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Details
                  </label>
                  <textarea
                    name="details"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    rows={3}
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Enter product details..."
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    PDF Files
                  </label>
                  <div className="space-y-3">
                    {form.pdfs.map((pdf, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm font-medium">{pdf.name}</span>
                        <button
                          type="button"
                          onClick={() => removePdf(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PDF name"
                        value={newPdfName}
                        onChange={(e) => setNewPdfName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handlePdfUpload(file);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                    {uploadingPdf && (
                      <p className="text-sm text-gray-500">Uploading PDF...</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      name="isActive"
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      checked={form.isActive}
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Active Product
                    </span>
                  </label>
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
                        setForm({
                          title: "",
                          text: "",
                          image: "",
                          icons: [],
                          details: "",
                          pdfs: [],
                          isActive: true,
                        });
                      }}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Preview */}
            <div>
              <ProductPreview />
            </div>
          </div>

          {/* Product List */}
          <div className="mt-12">
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
                            {product.title}
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
                          {product.text}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">
                            Icons: {product.icons.length}
                          </span>
                          {product.pdfs && product.pdfs.length > 0 && (
                            <span className="text-xs text-gray-500">
                              PDFs: {product.pdfs.length}
                            </span>
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
