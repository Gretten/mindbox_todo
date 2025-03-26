import { TodoAdd, TodoFilterPanel, TodoItem } from "../../../entities/todo";
import { useTodoAppStore } from "../model/useTodoAppStore";
import styles from "./style.module.css";
import { useTodoFilter } from "../model/useTodoFilter";
import { FC } from "react";
import { DNDBlock, DNDContext, dndOnDragEnd, DraggableWrapper } from '../../../shared/drag-n-drop/DargNDrop'

export const TodoApp: FC = () => {
  const { todos, setTodos, addTodo, deleteTodo, updateTodo, clearCompleted } =
    useTodoAppStore();
  const { filteredTodos, setFilter, filter } = useTodoFilter(todos);

  const onDragEnd = dndOnDragEnd(todos, setTodos);

  return (
    <div className={styles["app-container"]}>
      <h1>Продуктивник 🐝</h1>
      <div className="add-todo-form">
        <TodoAdd onAdd={addTodo} /> 
      </div>
      <DNDContext onDragEnd={onDragEnd}>
          <DNDBlock droppableId="list">
            {(provided) => {
              return (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodos &&
                    filteredTodos.map((todo, index) => (
                      <DraggableWrapper draggableId={todo.id} index={index} key={todo.id}>
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onUpdate={updateTodo}
                          />
                      </DraggableWrapper>
 
                    ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </DNDBlock>
      </DNDContext>
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
