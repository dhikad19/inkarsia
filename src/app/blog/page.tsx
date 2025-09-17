"use client";

import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogListPage() {
  const { data: posts, error } = useSWR("/api/posts", fetcher);

  if (error) return <div>Error loading posts</div>;
  if (!posts) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post._id} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600">{post.tags?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
