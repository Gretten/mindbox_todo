import { Todo } from "../model/model";
import styles from "./style.module.css";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  if (!todo) return null;

  const { id, title, isCompleted } = todo;

  const titleStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
    color: isCompleted ? "gray" : "black",
  };

  return (
    <div className={styles["todo-item"]}>
      <h3 style={titleStyle}>{title}</h3>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
