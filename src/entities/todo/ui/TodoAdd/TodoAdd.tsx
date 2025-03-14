import TextField from "@mui/material/TextField/TextField";
import { Todo } from "../..";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton/IconButton";
import { useState } from "react";
import { createTodo } from "../../lib/createTodo";
import styles from "./style.module.css";

interface TodoAddProps {
  onAdd: (todo: Todo) => void;
}

export const TodoAdd = ({ onAdd }: TodoAddProps) => {
  const [todoText, setCurrentTodoText] = useState("");

  const onCreateTodo = () => {
    if (!todoText) return;
    const todo = createTodo(todoText);
    onAdd(todo);
    setCurrentTodoText("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTodoText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onCreateTodo();
    }
  };

  return (
    <div className={styles["add-container"]}>
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="Что нужно сделать?"
        fullWidth
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={todoText}
      />
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        onClick={onCreateTodo}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};
