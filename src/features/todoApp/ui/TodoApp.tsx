import { TodoItem } from "../../../entities/todo";
import { useTodoAppStore } from "../model/useTodoAppStore";

export const TodoApp = () => {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoAppStore();

  const hasTodos = todos.length > 0;

  return (
    <div>
      <h1>Todo App</h1>
      <div className="add-todo-form"></div>
      <div className="todo-list">
        {hasTodos &&
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
          ))}

        {!hasTodos && <p>No todos</p>}
      </div>
      <div className="control-panel"></div>
    </div>
  );
};
