"use client";

import { useWaitQuery } from "@/hooks/query/useWaitQuery";

export function MyComponent(props: { wait: number }) {
  const [data] = useWaitQuery(props);
  return <div>result: {data}</div>;
}
