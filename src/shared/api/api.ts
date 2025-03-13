import { todoData } from './state';
import { TodoDTO } from './types';

export type TodosAdapter = {
    getTodos: () => Promise<TodoDTO[] | null>;
    getTodo: (id: string) => Promise<TodoDTO | null>;
    deleteTodo: (id: string) => Promise<TodoDTO[]>;
    addTodo: (newTodo: TodoDTO) => Promise<TodoDTO>;
    updateTodo: (id: string, updatedTodo: TodoDTO) => Promise<TodoDTO | null>;
};

export const todosAdapter: TodosAdapter = {
    getTodos: async () => {
        return todoData || null;
    },
    getTodo: async (id) => {
        return todoData.find(todo => todo.id === id) || null;
    },
    deleteTodo: async (id) => {
        todoData.filter(todo => todo.id !== id);
        return todoData;
    },
    addTodo: async (newTodo) => {
        todoData.push(newTodo);
        return newTodo;
    },
    updateTodo: async (id, updatedTodo) => {
        const index = todoData.findIndex(todo => todo.id === id);
        if (index === -1) {
            return null;
        }
        todoData[index] = updatedTodo;
        return updatedTodo;
    },
};