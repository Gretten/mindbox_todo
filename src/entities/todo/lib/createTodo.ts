import { v4 as uuidv4 } from "uuid";
import { Todo } from "../model/model";

export const createTodo = (title: string): Todo => {
  return {
    id: uuidv4(),
    title,
    isCompleted: false,
  };
};
