import { useTodoAppStore } from "../model/useTodoAppStore";

export const TodoApp = () => {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoAppStore();

  return (
    <div>
      <h1>Todo App</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
