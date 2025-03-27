import { DroppableProvided, DroppableStateSnapshot, OnDragEndResponder } from "@hello-pangea/dnd";
import { ReactNode } from "react";

export type DndReorderProps<T> = {
    list: T[];
    startIndex: number;
    endIndex: number;
};

export type DNDBlockProps = {
    droppableId: string;
    children: (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ) => ReactNode;
  };

 export type DraggableWrapperProps = {
    draggableId: string;
    index: number;
    children: React.ReactNode;
  };

export type DndOnDragEndFactory = <T>(
    state: T[],
    setState: (state: T[]) => void
) => OnDragEndResponder;

export type DndReorderParams = <T>(props: DndReorderProps<T>) => T[];