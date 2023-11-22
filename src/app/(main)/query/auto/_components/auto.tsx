"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function AutoComponent() {
  const queryClient = useQueryClient();
  const [intervalMs, setIntervalMs] = useState(10000);
  const [value, setValue] = useState("");

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get("/api/auto");
      return res.data ?? [];
    },

    // Refetch the data
    refetchInterval: intervalMs,
  });

  const addMutation = useMutation({
    mutationFn: (add: string) => fetch(`/api/auto?add=${add}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const clearMutation = useMutation({
    mutationFn: () => fetch(`/api/auto?clear=${true}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <span>Error: {error.message}</span>;
  if (Array.isArray(data) === false) {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  return (
    <>
      <div className="p-6">
        <h1>Auto Refetch with stale-time set to 1s)</h1>
        <p className="w-[800px] mb-2">
          This example is best experienced on your own machine, where you can
          open multiple tabs to the same localhost server and see your changes
          propagate between the two.
        </p>
        <label className="flex items-center gap-2">
          Query Interval speed (ms):{" "}
          <Input
            value={intervalMs}
            onChange={(ev) => setIntervalMs(Number(ev.target.value))}
            type="number"
            step="100"
            className="w-[100px]"
          />{" "}
          <span
            style={{
              display: "inline-block",
              marginLeft: ".5rem",
              width: 10,
              height: 10,
              background: isFetching ? "green" : "transparent",
              transition: !isFetching ? "all .3s ease" : "none",
              borderRadius: "100%",
              transform: "scale(2)",
            }}
          />
        </label>
        <h2>Todo List</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addMutation.mutate(value, {
              onSuccess: () => {
                setValue("");
              },
            });
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="enter something"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className="w-[300px]"
          />
          <Button type="submit">Sumbit</Button>
        </form>
        <ul>
          {Array.isArray(data) &&
            data?.map((item: string) => <li key={item}>{item}</li>)}
        </ul>
        <div>
          <button
            onClick={() => {
              clearMutation.mutate();
            }}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}
