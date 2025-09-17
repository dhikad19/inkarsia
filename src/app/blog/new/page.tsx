"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        tags: tags.split(",").map((t) => t.trim()),
        coverImage,
        status,
        content,
        author: "66c7d1234abcd56789ef0000", // ganti dgn userId login
      }),
    });
    router.push("/blog");
  }

  // Upload markdown file
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      setContent(text);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(
              e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            );
          }}
        />
        <input
          type="text"
          placeholder="Slug"
          className="w-full border p-2"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border p-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          className="w-full border p-2"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
        <select
          className="w-full border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        {/* Upload file markdown */}
        <input type="file" accept=".md" onChange={handleFileUpload} />

        <textarea
          placeholder="Write your post in Markdown..."
          className="w-full border p-2 h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Publish
        </button>
      </form>

      {/* Preview Markdown */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Preview</h2>
        <div className="prose border p-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
