"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPostById = async (id: number) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return data;
};

export function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}
