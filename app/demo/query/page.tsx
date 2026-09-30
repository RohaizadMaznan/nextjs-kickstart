"use client"; // [U1] useQuery is a hook, so Client Component.

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

// [U2] Validate API responses with Zod too: never trust data from the network.
const postSchema = z.object({ id: z.number(), title: z.string(), body: z.string() });
type Post = z.infer<typeof postSchema>;

// [U3] The fetcher: a plain async function. Throw on failure so useQuery sees an error.
async function fetchPosts(userId: number): Promise<Post[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`); // [U4] fetch does NOT throw on 404/500.
  return z.array(postSchema).parse(await res.json());
}

export default function QueryDemoPage() {
  const [userId, setUserId] = useState(1);

  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts", userId], //       [U5] Cache key. New userId = new key = new fetch, cached separately.
    queryFn: () => fetchPosts(userId), // [U6] How to get the data.
    enabled: userId > 0, //               [U7] Only run when this is true.
  });

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Posts (TanStack Query)</h1>

      <div className="mb-4 flex items-center gap-2">
        {[1, 2, 3].map((id) => (
          <Button key={id} variant={id === userId ? "default" : "outline"} onClick={() => setUserId(id)}>
            User {id}
          </Button>
        ))}
        {/* [U8] Manual refetch. isFetching is true during ANY fetch, including background ones. */}
        <Button variant="ghost" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Refreshing..." : "Refetch"}
        </Button>
      </div>

      {/* [U9] Handle the three states in order: loading, error, success. */}
      {isPending ? (
        <p>Loading...</p> // [U10] isPending = no data yet for this key.
      ) : isError ? (
        <p className="text-destructive">Error: {error.message}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.map((post) => (
            <li key={post.id} className="rounded-lg border p-3">
              <h2 className="font-medium">{post.title}</h2>
              <p className="text-sm text-muted-foreground">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
      {/* [U11] Click User 1, then 2, then 1: User 1 appears instantly from cache (staleTime in providers.tsx). */}
    </main>
  );
}
