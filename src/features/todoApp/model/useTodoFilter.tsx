import { useState, useMemo } from "react";
import { Todo } from "../../../entities/todo";

export const useTodoFilter = (todos: Todo[]) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.isCompleted;
      if (filter === "active") return !todo.isCompleted;
      return true;
    });
  }, [todos, filter]);

  return { filteredTodos, filter, setFilter };
};
