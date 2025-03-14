import { todoData } from "./state";
import { TodoDTO } from "./types";

export type TodosAdapter = {
  getTodos: () => Promise<TodoDTO[]>;
};

export const todosAdapter: TodosAdapter = {
  getTodos: async () => {
    return todoData;
  },
};
