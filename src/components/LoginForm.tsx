"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.error) return setError("Invalid email or password");
    router.push("/"); // sukses → ke homepage
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      <div className="flex flex-col gap-3 mt-4">
        <button
          onClick={() => signIn("google")}
          className="bg-red-500 text-white p-2 rounded"
        >
          Login with Google
        </button>
        <button
          onClick={() => signIn("facebook")}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Login with Facebook
        </button>
        <button
          onClick={() => signIn("twitter")}
          className="bg-black text-white p-2 rounded"
        >
          Login with X
        </button>
      </div>
    </div>
  );
}
