import { useState, useEffect } from "react";
import { todosAdapter } from "../../../shared/api/api";
import { Todo } from "../../../entities/todo/model/model";
import { storage } from "../../../shared/api/storage";

export const useTodoAppStore = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const {
    saveTodos,
    updateTodo: updateTodoInStorage,
    deleteTodo: deleteTodoInStorage,
  } = storage;

  useEffect(() => {
    todosAdapter.getTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  const addTodo = (todo: Todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo: Todo) => todo.id !== id));
    deleteTodoInStorage(id);
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prev) => prev.map((t: Todo) => (t.id === todo.id ? todo : t)));
    updateTodoInStorage(todo);
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
    saveTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return { todos, setTodos, addTodo, deleteTodo, updateTodo, clearCompleted };
};
