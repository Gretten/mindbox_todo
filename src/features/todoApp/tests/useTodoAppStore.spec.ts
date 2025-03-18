import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useTodoAppStore } from "../model/useTodoAppStore";
import { todosAdapter } from "../../../shared/api/api";

jest.mock("../../../shared/api/api", () => ({
  todosAdapter: {
    getTodos: jest.fn(),
  },
}));

// Покрытие тестами ключевой бизнес-логики
describe("useTodoAppStore", () => {
  const sampleTodos = [
    { id: "1", title: "Todo 1", isCompleted: false },
    { id: "2", title: "Todo 2", isCompleted: true },
  ];

  beforeEach(() => {
    (todosAdapter.getTodos as jest.Mock).mockResolvedValue(sampleTodos);
  });

  it("должен загрузить начальные todos", async () => {
    const { result } = renderHook(() => useTodoAppStore());

    expect(result.current.todos).toEqual([]);

    await waitFor(() => {
      expect(result.current.todos).toEqual(sampleTodos);
    });
  });

  it("должен добавлять новый todo", async () => {
    const { result } = renderHook(() => useTodoAppStore());

    await waitFor(() => {
      expect(result.current.todos).toEqual(sampleTodos);
    });

    const newTodo = { id: "3", title: "Todo 3", isCompleted: false };

    act(() => {
      result.current.addTodo(newTodo);
    });

    expect(result.current.todos[0]).toEqual(newTodo);
    expect(result.current.todos).toHaveLength(sampleTodos.length + 1);
  });

  it("должен удалять todo по id", async () => {
    const { result } = renderHook(() => useTodoAppStore());

    await waitFor(() => {
      expect(result.current.todos).toEqual(sampleTodos);
    });

    act(() => {
      result.current.deleteTodo("1");
    });

    expect(
      result.current.todos.find((todo) => todo.id === "1")
    ).toBeUndefined();
    expect(result.current.todos).toHaveLength(sampleTodos.length - 1);
  });

  it("должен обновлять существующий todo", async () => {
    const { result } = renderHook(() => useTodoAppStore());

    await waitFor(() => {
      expect(result.current.todos).toEqual(sampleTodos);
    });

    const updatedTodo = {
      id: "1",
      title: "Обновленный Todo 1",
      isCompleted: true,
    };

    act(() => {
      result.current.updateTodo(updatedTodo);
    });

    expect(result.current.todos.find((todo) => todo.id === "1")).toEqual(
      updatedTodo
    );
  });

  it("должен очищать выполненные todos", async () => {
    const { result } = renderHook(() => useTodoAppStore());

    await waitFor(() => {
      expect(result.current.todos).toEqual(sampleTodos);
    });

    act(() => {
      result.current.clearCompleted();
    });

    expect(result.current.todos.every((todo) => !todo.isCompleted)).toBe(true);
  });
});
