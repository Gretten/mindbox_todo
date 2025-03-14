import { TodoAdd, TodoItem } from "../../../entities/todo";
import { useTodoAppStore } from "../model/useTodoAppStore";
import styles from "./style.module.css";

export const TodoApp = () => {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoAppStore();

  const hasTodos = todos.length > 0;

  return (
    <div className={styles["app-container"]}>
      <h1>Todo App</h1>
      <div className="add-todo-form">
        <TodoAdd onAdd={addTodo} />
      </div>
      <div className="todo-list">
        {hasTodos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}

        {!hasTodos && <p>No todos</p>}
      </div>
      <div className="control-panel"></div>
    </div>
  );
};
