import { useState, useEffect } from "react";
import { todosAdapter } from "../../../shared/api/api";
import { Todo } from "../../../entities/todo/model/model";

export const useTodoAppStore = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todosAdapter.getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo: Todo) => todo.id !== id));
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prev) => prev.map((t: Todo) => (t.id === todo.id ? todo : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
  };

  return { todos, addTodo, deleteTodo, updateTodo, clearCompleted };
};
