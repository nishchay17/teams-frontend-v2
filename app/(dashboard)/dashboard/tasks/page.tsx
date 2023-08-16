"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import useMyUser, { useInvalidateMyUser } from "@/hooks/useMyUser";
import TaskCard, { IListItem } from "@/components/taskCard";
import useTaskStatusUpdate from "@/hooks/useTaskStatusUpdate";

interface ITaskList {
  [index: string]: {
    id: string;
    displayName: string;
    list: IListItem[];
  };
}

function TaskSkeleton() {
  const data: {
    [key: string]: { id: string; displayName: string; list: number[] };
  } = {
    new: {
      id: "new",
      displayName: "New",
      list: Array(2).fill(1),
    },
    inprogress: {
      id: "inprogress",
      displayName: "In Progress",
      list: Array(3).fill(1),
    },
    complete: {
      id: "complete",
      displayName: "Complete",
      list: Array(1).fill(1),
    },
  };
  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      {Object.keys(data).map((title) => (
        <div
          key={title}
          className="bg-background border p-4 flex gap-3 flex-col rounded-sm"
        >
          <p className="select-none mb-3">{data[title].displayName}</p>
          {data[title].list.map((_, key) => (
            <TaskCard
              priority="loading"
              key={key}
              isLoading
              name={"loading"}
              description="loading"
              _id="loading"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Tasks() {
  const updateTask = useTaskStatusUpdate();
  const myUser = useMyUser();
  const invalidateMyUser = useInvalidateMyUser();
  const ReloadIcon = Icons["reload"];
  const initialColumns: ITaskList = useMemo(
    () => ({
      new: {
        id: "new",
        displayName: "New",
        list: [],
      },
      inprogress: {
        id: "inprogress",
        displayName: "In Progress",
        list: [],
      },
      complete: {
        id: "complete",
        displayName: "Complete",
        list: [],
      },
    }),
    []
  );
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    if (!myUser.isLoading && myUser.data.status) {
      const newState = { ...initialColumns };
      newState.new.list = myUser.data.user.taskAssigned.map(
        (data: IListItem) => ({
          _id: data._id,
          name: data.name,
          updatedAt: data.updatedAt,
          description: data.description,
          priority: data.priority,
        })
      );
      newState.complete.list = myUser.data.user.taskCompleted.map(
        (data: IListItem) => ({
          _id: data._id,
          name: data.name,
          updatedAt: data.updatedAt,
          description: data.description,
          priority: data.priority,
        })
      );
      newState.inprogress.list = myUser.data.user.taskInProgress.map(
        (data: IListItem) => ({
          _id: data._id,
          name: data.name,
          updatedAt: data.updatedAt,
          description: data.description,
          priority: data.priority,
        })
      );
      setColumns(newState);
    }
  }, [myUser.isLoading, myUser.data, initialColumns]);

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
      // API update
      const itemId = start.list[source.index]._id;
      const status = end.id;
      updateTask.mutate({ id: itemId, type: status });

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
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl">Tasks</h2>
        <Button
          aria-label="reload tasks"
          onClick={invalidateMyUser}
          variant="ghost"
          isLoading={myUser.isFetching}
        >
          {!myUser.isFetching && <ReloadIcon size="1rem" />}
        </Button>
      </div>
      {myUser.isLoading ? (
        <TaskSkeleton />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {Object.values(columns).map((col) => (
              <Droppable droppableId={col.id} key={col.id}>
                {(provided) => (
                  <div
                    className="bg-background border p-4 flex flex-col rounded-sm"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <p className="select-none mb-3">{col.displayName}</p>
                    {col.list.map((task, index) => (
                      <Draggable
                        draggableId={task._id}
                        index={index}
                        key={task._id}
                      >
                        {(provided) => (
                          <div
                            className="mb-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard {...task} />
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
      )}
    </>
  );
}
