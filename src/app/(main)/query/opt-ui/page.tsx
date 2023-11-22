"use client";

import axios from "axios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTodos } from "./_hook/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OptimisticUIPage = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const todoQuery = useTodos();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: string) => {
      console.log("newTodo", newTodo);
      return axios.post("/api/optui", { text: newTodo });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <>
      <div className="pl-10 pt-2">
        <h1 className="text-lg">Optimistic Page</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setText("");
            addTodoMutation.mutate(text);
          }}
          className="flex gap-2"
        >
          <Input
            type="text"
            className="w-[300px]"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <Button disabled={addTodoMutation.isPending}>Create</Button>
        </form>
        <br />

        {todoQuery.isSuccess && (
          <>
            <div>
              Updated At: {new Date(todoQuery.data.ts).toLocaleTimeString()}
            </div>
            <ul>
              {todoQuery?.data?.items?.map((todo) => (
                <li key={todo.id}>{todo.text}</li>
              ))}
              {addTodoMutation.isPending && (
                <li className="opacity-50">{addTodoMutation.variables}</li>
              )}
              {addTodoMutation.isError && (
                <li className="text-red-600">
                  {addTodoMutation.variables}

                  <Button
                    variant="destructive"
                    className="ml-4"
                    onClick={() =>
                      addTodoMutation.mutate(addTodoMutation.variables)
                    }
                  >
                    Retry
                  </Button>
                </li>
              )}
            </ul>
            {todoQuery.isFetching && <div>Updating in background...</div>}
          </>
        )}
      </div>
    </>
  );
};

export default OptimisticUIPage;
