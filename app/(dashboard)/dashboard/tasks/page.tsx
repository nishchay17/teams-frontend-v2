"use client";

import { useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

function Card() {
  return (
    <div className="bg-background py-2 px-3 select-none">
      <p className="mb-1 text-sm font-medium">Create New frontend</p>
      <p className="text-xs opacity-90">
        Create with next js and with a clean UI
      </p>
    </div>
  );
}

interface IListSome {
  [index: string]: {
    id: string;
    displayName: string;
    list: string[];
  };
}

export default function Tasks() {
  const initialColumns: IListSome = {
    new: {
      id: "new",
      displayName: "New",
      list: ["item 1", "item 2", "item 3", "item 4", "item 5", "item 6"],
    },
    inprogress: {
      id: "inprogress",
      displayName: "In Progress",
      list: ["item 7", "item 8", "item 9"],
    },
    complete: {
      id: "complete",
      displayName: "Complete",
      list: [],
    },
  };
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        displayName: start.displayName,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        displayName: start.displayName,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        displayName: end.displayName,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <>
      <h2 className="text-2xl mb-4">Tasks</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-5">
          {Object.values(columns).map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  className="bg-primary-foreground border-2 p-4 flex flex-col gap-3 rounded-sm"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <p>{col.displayName}</p>
                  {col.list.map((text, index) => (
                    <Draggable draggableId={text} index={index} key={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
