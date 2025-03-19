import { TodoDTO } from "./types";

interface StorageAdapter {
  getTodos: () => Promise<TodoDTO[]>;
  saveTodos: (todos: TodoDTO[]) => Promise<void>;
  updateTodo: (todo: TodoDTO) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const storage: StorageAdapter = {
  getTodos: async () => {
    try {
      const data = localStorage.getItem("todos");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to get todos", error);
      return [];
    }
  },
  saveTodos: async (todos) => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos", error);
    }
  },
  updateTodo: async (todo) => {
    try {
      const todos = await storage.getTodos();
      const updatedTodos = todos.map((t) => (t.id === todo.id ? todo : t));
      await storage.saveTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  },
  deleteTodo: async (id) => {
    try {
      const todos = await storage.getTodos();
      const updatedTodos = todos.filter((t) => t.id !== id);
      await storage.saveTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  },
};
