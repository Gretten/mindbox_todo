import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import type { DroppableProvided, DroppableStateSnapshot, OnDragEndResponder  } from '@hello-pangea/dnd';
import { FC, PropsWithChildren, ReactNode } from 'react';

type DndReorderProps<T> = {
    list: T[];
    startIndex: number;
    endIndex: number;
};

type DNDBlockProps = {
    droppableId: string;
    children: (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ) => ReactNode;
  };

export const DNDContext = DragDropContext;

export const DNDBlock: FC<DNDBlockProps> = ({ children, droppableId }) => (
    <Droppable droppableId={droppableId}>
        {children}
    </Droppable>
)

export const DraggableWrapper = ({ draggableId, index, children }: { draggableId: string; index: number; children: React.ReactNode }) => {
    return (
      <Draggable draggableId={draggableId} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
          </div>
        )}
      </Draggable>
    );
  }

export const dndReorder = <T,>(props: DndReorderProps<T>): T[] => {
    const { list, startIndex, endIndex } = props;
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}; 

// Обертка респондера для onDragEnd. 
export const dndOnDragEnd = <T,>(state: T[], setState: (state: T[]) => void) => {
    const responder: OnDragEndResponder = (result) => {
        if (!result.destination) {
            return;
          }
      
          if (result.destination.index === result.source.index) {
            return;
          }
      
          const todos = dndReorder(
            {list: state,
            startIndex: result.source.index,
            endIndex: result.destination.index}
          );
      
          setState(todos);
    }
    return responder;
};