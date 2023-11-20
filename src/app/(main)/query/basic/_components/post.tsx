"use client";

import Link from "next/link";
import { usePost } from "../_hooks/usePost";

interface PostProps {
  postId: number;
  setPostId: (postId: number) => void;
}

export function Post({ postId, setPostId }: PostProps) {
  const { status, data, error, isFetching } = usePost(postId);
  return (
    <div>
      <div>
        <Link href="#" onClick={() => setPostId(-1)}>
          Back
        </Link>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}
