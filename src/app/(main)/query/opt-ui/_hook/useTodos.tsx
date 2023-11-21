"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Todos = {
  items: readonly {
    id: string;
    text: string;
  }[];
  ts: number;
};

async function fetchTodos(): Promise<Todos> {
  const response = await axios.get("/api/optui");
  return response.data;
}

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}
