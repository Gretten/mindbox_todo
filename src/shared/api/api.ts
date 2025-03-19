import { todoData } from "./state";
import { TodoDTO } from "./types";

export type TodosAdapter = {
  getTodos: () => Promise<TodoDTO[]>;
};

export const todosAdapter: TodosAdapter = {
  getTodos: async () => {
    try {
      const data = localStorage.getItem("todos");
      return data ? JSON.parse(data) : todoData;
    } catch (error) {
      console.error("Failed to get todos", error);
      return [];
    }
  },
};
