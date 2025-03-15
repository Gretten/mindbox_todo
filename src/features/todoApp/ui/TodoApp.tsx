import { TodoAdd, TodoFilterPanel, TodoItem } from "../../../entities/todo";
import { useTodoAppStore } from "../model/useTodoAppStore";
import styles from "./style.module.css";
import { useTodoFilter } from "../model/useTodoFilter";
import { FC } from "react";

export const TodoApp: FC = () => {
  const { todos, addTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodoAppStore();
  const { filteredTodos, setFilter, filter } = useTodoFilter(todos);

  return (
    <div className={styles["app-container"]}>
      <h1>Продуктивник 🐝</h1>
      <div className="add-todo-form">
        <TodoAdd onAdd={addTodo} />
      </div>
      <div className="todo-list">
        {filteredTodos &&
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
      </div>
      <div className={styles["control-panel"]}>
        <TodoFilterPanel
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
};
