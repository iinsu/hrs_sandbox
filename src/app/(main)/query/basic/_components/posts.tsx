"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePosts } from "../_hooks/usePosts";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PostsProps {
  setPostId: (postId: number) => void;
}
interface PostProps {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Posts = ({ setPostId }: PostsProps) => {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <>
      <div className="h-[500px] overflow-auto">
        <h1 className="text-lg">Posts</h1>
        <div>
          {status === "pending" ? (
            "Loading..."
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <div>
                {data.map((post: PostProps) => (
                  <p key={post.id}>
                    <Link
                      href="#"
                      onClick={() => setPostId(post.id)}
                      className={cn(
                        queryClient.getQueryData(["post", post.id])
                          ? "text-lg text-green-500"
                          : ""
                      )}
                    >
                      {post.title}
                    </Link>
                  </p>
                ))}
              </div>
              <div>{isFetching ? "Background Updating..." : " "}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
