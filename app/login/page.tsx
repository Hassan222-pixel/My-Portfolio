// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Hardcoded credentials as requested
    if (email === "hassanawadk123@gmail.com" && password === "Hassan41257") {
      // In a real app, you'd set a secure HTTP-only cookie here
      localStorage.setItem("isAuthenticated", "true");
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border">
        <h2 className="text-2xl font-bold text-textMain mb-2">Welcome Back</h2>
        <p className="text-textDim mb-6 text-sm">
          Sign in to manage your portfolio.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-danger/10 border border-danger text-danger rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMain mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-textMain focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
