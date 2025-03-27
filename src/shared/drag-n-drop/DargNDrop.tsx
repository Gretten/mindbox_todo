import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import type { OnDragEndResponder  } from '@hello-pangea/dnd';
import { FC } from 'react';
import { DNDBlockProps, DraggableWrapperProps, DndOnDragEndFactory, DndReorderParams } from './types';

export const DNDContext = DragDropContext;

export const DNDBlock: FC<DNDBlockProps> = ({ children, droppableId }) => (
    <Droppable droppableId={droppableId}>
        {children}
    </Droppable>
)

export const DraggableWrapper: FC<DraggableWrapperProps> = ({ draggableId, index, children }) => {
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

export const dndReorder: DndReorderParams = (props) => {
    const { list, startIndex, endIndex } = props;
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
}; 

// Обертка респондера для onDragEnd. 
export const dndOnDragEnd: DndOnDragEndFactory = (state, setState) => {
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