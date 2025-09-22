"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoProfile, setPhotoProfile] = useState<File | null>(null);
  const [usernameError, setUsernameError] = useState("");

  const [role, setRole] = useState("");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  async function handleCheckUsername() {
    const res = await fetch("/api/auth/check-username", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!data.available) {
      setUsernameError(data.message);
    } else {
      setUsernameError("");
      setStep(3);
    }
  }

  async function handleRegister() {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("firstName", firstName);
    if (lastName) formData.append("lastName", lastName);
    if (photoProfile) formData.append("photoProfile", photoProfile);
    formData.append("role", role);
    formData.append("language", language);
    formData.append("timezone", timezone);
    formData.append("interests", JSON.stringify(interests));

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Register success 🎉");
    } else {
      alert(data.error || "Failed to register");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 1: Account</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 2: Profile</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p className="text-red-500">{usernameError}</p>}
          <input
            type="text"
            placeholder="First Name"
            className="w-full border p-2 mb-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name (optional)"
            className="w-full border p-2 mb-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="mb-2"
            onChange={(e) => setPhotoProfile(e.target.files?.[0] || null)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleCheckUsername}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 3: Preferences</h2>

          <select
            className="w-full border p-2 mb-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="reader">Reader</option>
            <option value="author">Author</option>
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
            <option value="client">Client</option>
          </select>

          <input
            type="text"
            placeholder="Preferred Language (ex: en, id)"
            className="w-full border p-2 mb-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Timezone (ex: GMT+7)"
            className="w-full border p-2 mb-2"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Interests (comma separated)"
            className="w-full border p-2 mb-2"
            onChange={(e) => setInterests(e.target.value.split(","))}
          />

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleRegister}
          >
            Finish Register
          </button>
        </div>
      )}
    </div>
  );
}
