"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Project {
  _id?: string;
  id?: string;
  name: string;
  summary: string;
  date: string;
  images: string[];
  details: string;
  challenges: string[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({
    images: [],
    challenges: [""],
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

  async function fetchProjects() {
    const res = await fetch("/api/admin/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data.projects);
    } else if (res.status === 403) {
      router.replace("/admin/login");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleImageUpload(files: FileList | null) {
    if (!files) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          uploaded.push(data.url);
        } else {
          setError("Image upload failed");
        }
      } catch {
        setError("Image upload failed");
      }
    }
    setForm({
      ...form,
      images: [...(form.images || []), ...uploaded],
    });
    setUploading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChallengeChange(idx: number, value: string) {
    const updated = [...(form.challenges || [])];
    updated[idx] = value;
    setForm({ ...form, challenges: updated });
  }

  function addChallenge() {
    setForm({
      ...form,
      challenges: [...(form.challenges || []), ""],
    });
  }

  function removeChallenge(idx: number) {
    const updated = [...(form.challenges || [])];
    updated.splice(idx, 1);
    setForm({ ...form, challenges: updated });
  }

  function removeImage(idx: number) {
    const updated = [...(form.images || [])];
    updated.splice(idx, 1);
    setForm({ ...form, images: updated });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...form } : form;
    const res = await fetch("/api/admin/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ images: [], challenges: [""] });
      setEditingId(null);
      setError("");
      fetchProjects();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to save project");
    }
  }

  function handleEdit(project: Project) {
    setForm({
      name: project.name || "",
      summary: project.summary || "",
      date: project.date || "",
      details: project.details || "",
      images: project.images || [],
      challenges: project.challenges || [""],
    });
    setEditingId(project._id || project.id || null);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    if (res.ok) fetchProjects();
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
                className="text-blue-600 hover:text-blue-800 font-medium"
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
            Project Management
          </h2>

          {/* Live Preview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <div className="max-w-xl mx-auto">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg bg-white">
                <div
                  className="absolute inset-0 bg-white z-0"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
                  }}
                />
                {form.images && form.images[0] && (
                  <img
                    src={form.images[0]}
                    alt={form.name || "Project image"}
                    className="absolute inset-0 w-full h-full object-cover object-center z-10"
                    style={{ borderRadius: "inherit" }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {form.name || "Project Name"}
                  </h3>
                  <p className="text-gray-700 text-base font-medium mb-2 line-clamp-2">
                    {form.summary || "Project summary will appear here."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Form */}
          <form onSubmit={handleSubmit} className="mb-12 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.name || ""}
                  onChange={handleChange}
                  placeholder="Enter project name..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Summary
                </label>
                <input
                  name="summary"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.summary || ""}
                  onChange={handleChange}
                  placeholder="Short summary..."
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  name="date"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.date || ""}
                  onChange={handleChange}
                  placeholder="e.g. 5 Jan 2025"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Details
                </label>
                <textarea
                  name="details"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-200"
                  value={form.details || ""}
                  onChange={handleChange}
                  placeholder="Project details..."
                  required
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {(form.images || []).map((img, idx) => (
                  <div key={`project-image-${idx}`} className="relative group">
                    <img
                      src={img}
                      alt="project"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-xs text-red-600 group-hover:bg-opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {uploading && (
                <div className="text-sm text-blue-600 mt-2">Uploading...</div>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Challenges
              </label>
              {(form.challenges || []).map((challenge, idx) => (
                <div
                  key={`project-challenge-${idx}`}
                  className="flex items-center mb-2"
                >
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-200"
                    value={challenge}
                    onChange={(e) => handleChallengeChange(idx, e.target.value)}
                    placeholder={`Challenge #${idx + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeChallenge(idx)}
                    className="ml-2 text-red-600 hover:text-red-800"
                    disabled={form.challenges && form.challenges.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addChallenge}
                className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Add Challenge
              </button>
            </div>

            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading
                  ? editingId
                    ? "Saving..."
                    : "Creating..."
                  : editingId
                    ? "Update Project"
                    : "Create Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="text-gray-500 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      summary: "",
                      date: "",
                      details: "",
                      images: [],
                      challenges: [""],
                    });
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* Project List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              All Projects
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No projects yet. Create your first one above!
                </p>
              ) : (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project._id || project.id}
                      className="bg-white p-4 rounded-lg border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {project.summary}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Date: {project.date}</span>
                          <span>Images: {project.images?.length || 0}</span>
                          <span>
                            Challenges: {project.challenges?.length || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="text-blue-700 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded hover:bg-blue-50"
                          onClick={() => handleEdit(project)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded hover:bg-red-50"
                          onClick={() =>
                            handleDelete(project._id || project.id || "")
                          }
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
