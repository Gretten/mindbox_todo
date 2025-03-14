import Button from "@mui/material/Button/Button";
import { TodoAdd, TodoItem } from "../../../entities/todo";
import { useTodoAppStore } from "../model/useTodoAppStore";
import styles from "./style.module.css";
import { MinorButton } from "../../../shared/ui/MinorButton";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";

export const TodoApp = () => {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoAppStore();

  const hasTodos = todos.length > 0;
  const activeTodosNumber =
    todos.filter((todo) => !todo.isCompleted).length || 0;

  return (
    <div className={styles["app-container"]}>
      <h1>Продуктивник 🐝</h1>
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

        {!hasTodos && <p>Всё сделано! ☑</p>}
      </div>
      <div className={styles["control-panel"]}>
        <div className={styles["control-panel-filter"]}>
          <ButtonGroup>
            <MinorButton variant="text" size="small">
              Все
            </MinorButton>
            <MinorButton variant="text" size="small">
              Готовые
            </MinorButton>
            <MinorButton variant="text" size="small">
              Активные
            </MinorButton>
          </ButtonGroup>
        </div>
        <MinorButton variant="text" size="small">
          Очистить
        </MinorButton>
      </div>
    </div>
  );
};
