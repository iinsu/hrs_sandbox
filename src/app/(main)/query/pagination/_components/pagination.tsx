"use client";

import axios from "axios";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface ProjectProps {
  name: string;
  id: number;
}

async function fetchProject(page = 0) {
  const { data } = await axios.get("/api/pagination?page=" + page);
  return data;
}

export const Pagination = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["project", page],
    queryFn: () => fetchProject(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  //Prefetch the next apge!
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["project", page + 1],
        queryFn: () => fetchProject(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <>
      <div>
        <p>
          In this example, each page of data remains visible as the next page is
          fetched. The buttons and capability to proceed to the next page are
          also supressed until the next page cursor is known. Each page is
          cached as a normal query too, so when going to previous pages,
          you&apos;ll see them instantaneously while they are also refetched
          invisibly in the background.
        </p>
        {status === "pending" ? (
          <div>Loading...</div>
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          // `data` will either resolve to the lastest page's data
          // or if fetching a new page, ths last successful page's data
          <div>
            {data.projects.map((project: ProjectProps) => (
              <p key={project.id}>{project.name}</p>
            ))}
          </div>
        )}
        <div>Current Page: {page + 1}</div>
        <Button
          disabled={page === 0}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => {
            setPage((old) => (data?.hasMore ? old + 1 : old));
          }}
          disabled={isPlaceholderData || !data?.hasMore}
          className="ml-2"
        >
          Next Page
        </Button>
        {
          /* 
          Since the latst page's data potentially sticks around between page request,
          we can use `isFetching` to show a background loading
          indicator since our `status === 'pending'` state won't be triggered
          */
          isFetching ? <span>Loading...</span> : null
        }
      </div>
    </>
  );
};
