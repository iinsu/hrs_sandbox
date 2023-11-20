"use client";

import { useWaitQuery } from "@/app/(main)/query/next-stream/_hooks/useWaitQuery";

export function MyComponent(props: { wait: number }) {
  const [data] = useWaitQuery(props);
  return <div>result: {data}</div>;
}
