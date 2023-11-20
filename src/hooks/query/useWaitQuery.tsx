"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

function getBaseURL() {
  if (typeof window !== "undefined") {
    return "";
  }
  return "http://localhost:3000";
}

const baseUrl = getBaseURL();

export function useWaitQuery(props: { wait: number }) {
  const query = useSuspenseQuery({
    queryKey: ["wait", props.wait],
    queryFn: async () => {
      const path = `/api/wait?wait=${props.wait}`;
      const url = baseUrl + path;

      const res: string = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json();
      return res;
    },
  });

  return [query.data as string, query] as const;
}
