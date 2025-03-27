import Checkbox from "@mui/material/Checkbox/Checkbox";
import { Todo } from "../../model/model";
import styles from "./style.module.css";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FC } from "react";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  if (!todo) return null;

  const { id, title, isCompleted } = todo;

  const titleStyle = {
    textDecoration: isCompleted ? "line-through" : "none",
    color: isCompleted ? "gray" : "black",
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
      <div className={styles["todo-item"]}>
        <div className={styles["left-panel"]}>
          <Checkbox
            {...label}
            checked={isCompleted}
            onChange={() => onUpdate({ ...todo, isCompleted: !isCompleted })}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
          <h3 style={titleStyle}>{title}</h3>
        </div>
        <IconButton
          color="warning"
          aria-label="delete todo"
          onClick={() => onDelete(id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
  );
};
