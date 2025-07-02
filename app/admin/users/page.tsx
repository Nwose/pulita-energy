"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchUsers() {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    } else if (res.status === 403) {
      router.replace("/admin/login");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    setLoading(false);
    if (res.ok) {
      setEmail("");
      setPassword("");
      setRole("admin");
      fetchUsers();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create user");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setLoading(false);
    if (res.ok) fetchUsers();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-900">Admin Users</h1>
        <form onSubmit={handleCreate} className="mb-8 flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Role</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">admin</option>
              <option value="superadmin">superadmin</option>
            </select>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "+ Create Admin"}
          </button>
        </form>
        <h2 className="text-lg font-semibold mb-2">All Admins</h2>
        <ul className="divide-y">
          {users.map((u) => (
            <li key={u.id} className="py-2 flex items-center justify-between">
              <span>
                {u.email}{" "}
                <span className="text-xs text-gray-500 ml-2">({u.role})</span>
              </span>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(u.id)}
                disabled={loading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
