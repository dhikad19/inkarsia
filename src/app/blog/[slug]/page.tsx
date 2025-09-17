"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: post, error } = useSWR(`/api/posts/${slug}`, fetcher);
  const { data: comments, mutate } = useSWR(
    () => (post ? `/api/comments?postId=${post._id}` : null),
    fetcher
  );
  const [commentText, setCommentText] = useState("");

  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Loading...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: post._id,
        author: "Guest",
        content: commentText,
      }),
    });
    setCommentText("");
    mutate();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border p-2 mb-2"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>

      <div className="space-y-4">
        {comments?.map((c: any) => (
          <div key={c._id} className="border p-3 rounded">
            <p className="font-semibold">{c.author}</p>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
